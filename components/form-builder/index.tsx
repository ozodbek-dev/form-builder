"use client";
import { Form } from "@prisma/client";
import React, { use } from "react";
import PreviewDialogBtn from "../preview-dialog-btn";
import SaveFormBtn from "../save-form-btn";
import PublishFormBtn from "../publish-form-btn";
import Designer from "../designer";
import { DndContext, MouseSensor, MouseSensorOptions, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "../drag-overlay-wrapper";

function FormBuilder({ form }: { form: Form }) {
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance:5
		},
	});

	const sensors = useSensors(mouseSensor, touchSensor);
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
								<SaveFormBtn />
								<PublishFormBtn />
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
