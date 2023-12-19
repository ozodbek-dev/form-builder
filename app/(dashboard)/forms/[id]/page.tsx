import { GetFormById } from "@/actions/form";
import FormLinkShare from "@/components/form-link-share";
import StatsCard from "@/components/stats-card";
import VisitBtn from "@/components/visit-btn";
import React from "react";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";

export default async function BuilderPage({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const form = await GetFormById(Number(params.id));
	if (!form) throw Error("Form not found");

	const { visits, submissions } = form;
	let submissioinsRete = 0;
	if (visits > 0) {
		submissioinsRete = (submissions / visits) * 100;
	}

	const bounceRate = 100 - submissioinsRete;

	return (
		<>
			<div className='py-10 border-t border-b border-muted'>
				<div className='flex justify-between container'>
					<h1 className='text-4xl font-bold truncate  '>{form.name}</h1>
					<VisitBtn shareUrl={form.shareURL} />
				</div>
			</div>

			<div className='py-4 border-b borer-muted items-center justify-between'>
				<div className=' container flex gap-4 items-center justify-between'>
					<FormLinkShare shareUrl={form.shareURL} />
				</div>
			</div>

			<div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>
				<StatsCard
					title='Total Visits'
					icon={<LuView className='text-blue-600' />}
					helperText='All time from visits'
					value={visits.toLocaleString() + "%" || ""}
					loading={false}
					className='shadow-md shadow-blue-600'
				/>
				<StatsCard
					title='Total Submitions'
					icon={<FaWpforms className='text-yellow-600' />}
					helperText='All time from submitions'
					value={visits.toLocaleString() + "%" || ""}
					loading={false}
					className='shadow-md shadow-yellow-600'
				/>
				<StatsCard
					title='Submission Rate'
					icon={<HiCursorClick className='text-green-600' />}
					helperText='Visits that result from submitions '
					value={visits.toLocaleString() + "%" || ""}
					loading={false}
					className='shadow-md shadow-green-600'
				/>
				<StatsCard
					title='Bounce Rate'
					icon={<TbArrowBounce className='text-red-600' />}
					helperText='Visits that leaves without interaction '
					value={visits.toLocaleString() + "%" || ""}
					loading={false}
					className='shadow-md shadow-red-600'
				/>
			</div>

			<div className=" container pt-10">
				<SubmissionsTable id={form.id}  />
			</div>
		</>
	);
}


function SubmissionsTable({ id }: { id: number }) {
	return <>
		<h1 className="text-2xl font-bold my-4">Submissions</h1>
	</>;
}