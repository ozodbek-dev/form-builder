"use client";
import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "../preview-dialog-btn";
import SaveFormBtn from "../save-form-btn";
import PublishFormBtn from "../publish-form-btn";
import Designer from "../designer";
import { DndContext } from "@dnd-kit/core";

function FormBuilder({ form }: { form: Form }) {
	return (
		<DndContext>
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
		</DndContext>
	);
}

export default FormBuilder;
