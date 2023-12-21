"use client";
import { Form } from "@prisma/client";
import React, { use, useEffect, useState } from "react";
import PreviewDialogBtn from "../preview-dialog-btn";
import SaveFormBtn from "../save-form-btn";
import PublishFormBtn from "../publish-form-btn";
import Designer from "../designer";
import { DndContext, MouseSensor, MouseSensorOptions, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "../drag-overlay-wrapper";
import useDesignerContext from "@/hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from 'react-confetti';

function FormBuilder({ form }: { form: Form }) {
	const [isReady, setIsReady] = useState(false);
	const { setElements,setSelectedElement } = useDesignerContext();
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	});
	const sensors = useSensors(mouseSensor, touchSensor);
	useEffect(() => {
		const elements = JSON.parse(form.content);
		setElements(elements);
		setSelectedElement(null);
		const readyTimeOut = setTimeout(() => {
			setIsReady(true);
		}, 500);

		return () => {
			clearTimeout(readyTimeOut);
		};
	}, [form, setElements, setSelectedElement]);
	if (!isReady) {
		return (
			<div className='flex flex-col items-center justify-center w-full h-full only:'>
				<ImSpinner2 className='animate-spin h-12 w-12' />
			</div>
		);
	}

	const sharUrl = `${window.location.origin}/submit/${form.shareURL}`;
	if (form.published) {
		return (
			<>
				<Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={1000} recycle={false}/>
				<div className='flex flex-col items-center justify-center h-full w-full'>
					<div className='max-w-md'>
						<h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>Form has been published</h1>
						<h2 className='text-2xl'>Share this form </h2>
						<h3 className='text-xl text-muted-foreground border-b pb-10'>Anyone with the link can view and submit the form</h3>
						<div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
							<Input className='w-full ' readOnly value={sharUrl} />
							<Button
								className='mt-2 w-full '
								onClick={() => {
									navigator.clipboard.writeText(sharUrl);
									toast({
										title: "Copied",
										description: "Link copied to clipboard",
									})
								}}
							>
								Copy link
							</Button>
						</div>
						<div className="flex justify-between">
							<Button variant={"link"} asChild>
								<Link href={"/"} className="gap-2">
									<BsArrowLeft/>
									Go Back Home
								</Link>
							</Button>
							<Button variant={"link"} asChild>
								<Link href={`/forms/${form.id}`} className="gap-2">
									Form detailes
									<BsArrowRight/>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<DndContext sensors={sensors}>
			<main className='flex flex-col w-full h-screen '>
				<nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
					<h2 className='truncate font-medium '>
						<span className='text-muted-foreground'>{form.name}</span>
					</h2>
					<div className='flex item-center gap-2'>
						<PreviewDialogBtn />
						{!form.published && (
							<>
								<SaveFormBtn id={form.id} />
								<PublishFormBtn id={form.id} />
							</>
						)}
					</div>
				</nav>

				<div className='flex flex-grow h-full items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
					<Designer />
				</div>
			</main>
			<DragOverlayWrapper />
		</DndContext>
	);
}

export default FormBuilder;
