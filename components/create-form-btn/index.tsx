"use client";
import React from "react";

import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Dialog, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { formSchema, formSchemaType } from "@/schemas/form.schema";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export default function CreateFormButton() {

  const router = useRouter();
	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: formSchemaType) => {
		try {
			const formId = await CreateForm(values);

			toast({
				title: "Success",
				description: "Form created successfully",
			});
      router.push(`/builder/${formId}`);
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong, Please try again",
				variant: "destructive",
			});
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"} className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary  hover:cursor-pointer border-dashed gap-4 bg-background'>
					<BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
					<p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create new Form</p>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create form</DialogTitle>
					<DialogDescription>Create a new form to start collection responses</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea rows={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={form.formState.isSubmitting}
						type='submit'
						className='w-full mt-4'
					>
						{!form.formState.isSubmitting && "Save"}
						{form.formState.isSubmitting && <ImSpinner2 className='animate-spin' />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
