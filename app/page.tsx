import { GetFormStats } from "@/actions/form";
import Layout from "./(dashboard)/layout";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import StatsCard from "@/components/stats-card";

import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/create-form-btn";
import FormCards from "@/components/form-cards";
import FormCardSkeleton from "@/components/form-card-skeleton";
import { useRouter } from "next/navigation";

export default function Home() {
	return (
		<Layout>
			<div className='container pt-4'>
				<Suspense>
					<CardStatWrapper />
				</Suspense>
				<Separator className='my-6' />
				<h2 className='text-4xl font-bold col-span-2'>Your Forms</h2>
				<Separator className='my-6' />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
					<CreateFormButton />
					<Suspense
						fallback={[1,1,1,1,1,1,1,1,1,1,1].map((_,index) => (
							<FormCardSkeleton key={index} />
						))}
					>
						<FormCards />
					</Suspense>
				</div>
			</div>
		</Layout>
	);
}

async function CardStatWrapper() {
	const stats = await GetFormStats();
	return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
	data: Awaited<ReturnType<typeof GetFormStats>>;
	loading: boolean;
}

function StatsCards(props: StatsCardProps) {
	const { data, loading } = props;

	return (
		<div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
			<StatsCard
				title='Total Visits'
				icon={<LuView className='text-blue-600' />}
				helperText='All time from visits'
				value={data.visits.toLocaleString() + "%" || ""}
				loading={loading}
				className='shadow-md shadow-blue-600'
			/>
			<StatsCard
				title='Total Submitions'
				icon={<FaWpforms className='text-yellow-600' />}
				helperText='All time from submitions'
				value={data.visits.toLocaleString() + "%" || ""}
				loading={loading}
				className='shadow-md shadow-yellow-600'
			/>
			<StatsCard
				title='Submission Rate'
				icon={<HiCursorClick className='text-green-600' />}
				helperText='Visits that result from submitions '
				value={data.visits.toLocaleString() + "%" || ""}
				loading={loading}
				className='shadow-md shadow-green-600'
			/>
			<StatsCard
				title='Bounce Rate'
				icon={<TbArrowBounce className='text-red-600' />}
				helperText='Visits that leaves without interaction '
				value={data.visits.toLocaleString() + "%" || ""}
				loading={loading}
				className='shadow-md shadow-red-600'
			/>
		</div>
	);
}
