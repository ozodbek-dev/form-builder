import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import FormLinkShare from "@/components/form-link-share";
import StatsCard from "@/components/stats-card";
import VisitBtn from "@/components/visit-btn";
import React, { ReactNode } from "react";
import { LuView } from "react-icons/lu";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { ElementsType, FormElementInstance } from "@/components/form-elements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
					value={visits.toLocaleString() || ""}
					loading={false}
					className='shadow-md shadow-blue-600'
				/>
				<StatsCard
					title='Total Submitions'
					icon={<FaWpforms className='text-yellow-600' />}
					helperText='All time from submitions'
					value={submissions.toLocaleString() || ""}
					loading={false}
					className='shadow-md shadow-yellow-600'
				/>
				<StatsCard
					title='Submission Rate'
					icon={<HiCursorClick className='text-green-600' />}
					helperText='Visits that result from submitions '
					value={submissioinsRete.toLocaleString() + "%" || ""}
					loading={false}
					className='shadow-md shadow-green-600'
				/>
				<StatsCard
					title='Bounce Rate'
					icon={<TbArrowBounce className='text-red-600' />}
					helperText='Visits that leaves without interaction '
					value={bounceRate.toLocaleString() + "%" || ""}
					loading={false}
					className='shadow-md shadow-red-600'
				/>
			</div>

			<div className=' container pt-10'>
				<SubmissionsTable id={form.id} />
			</div>
		</>
	);
}

interface IColumns {
	id: string;
	label: string;
	required: boolean;
	type: ElementsType;
}

type Row = {
	[key: string]: string;
} & { submittedAt: Date };

async function SubmissionsTable({ id }: { id: number }) {
	const form = await GetFormWithSubmissions(id);
	if (!form) {
		throw new Error("Form not found");
	}

	const formElements = JSON.parse(form.content) as FormElementInstance[];

	const columns: IColumns[] = [];

	formElements.forEach(element => {
		switch (element.type) {
			case "TextField":
			case "DateField":
			case "CheckBoxField":
			case "SelectField":
			case "CheckBoxField":
			case "NumberField":
				columns.push({
					id: element.id,
					label: element.extraAttributes?.label,
					required: element.extraAttributes?.required || false,
					type: element.type,
				});
				break;
			default:
				break;
		}
	});

	const rows: Row[] = [];

	form.FormSubmissions.forEach(submission => {
		const content = JSON.parse(submission.content);
		rows.push({
			...content,
			submittedAt: new Date(submission.createdAt),
		});
	});

	return (
		<>
			<h1 className='text-2xl font-bold my-4'>Submissions</h1>
			<div className='rounded-md'>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map(column => (
								<TableHead key={column.id} className='uppercase'>
									{column.label}
								</TableHead>
							))}
							<TableHead className='text-muted-foreground text-right uppercase'>Submitted at</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{rows.map((row, idx) => (
							<TableRow key={idx}>
								{columns.map(column => (
									<RowCell key={column.id} value={row[column.id]} type={column.type} />
								))}
								<TableCell className='text-muted-foreground text-right'>
									{formatDistance(row.submittedAt, new Date(), {
										addSuffix: true,
									})}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

function RowCell({ value, type }: { value: string; type: ElementsType }) {
	let node: ReactNode = value;

	switch (type) {
		case "DateField": {
			if (!value) break;
			const date = new Date(value);
			node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
			break;
		}
		case "CheckBoxField": {
			const checked = value === "true";
			node = <Checkbox checked={checked} disabled />;
			break;
		}
	}

	return <TableCell>{node}</TableCell>;
}
