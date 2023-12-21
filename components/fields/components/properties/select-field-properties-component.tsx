import { FormElementInstance } from "@/components/form-elements";
import React, { useEffect } from "react";
import { CustomInstance, propertiesSchema } from "../../select-field";
import useDesignerContext from "@/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "@/components/ui/use-toast";

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function SelectFieldPropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const { updateElement,setSelectedElement } = useDesignerContext();
	const element = elementInstance as CustomInstance;
	const form = useForm<PropertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onSubmit",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			placeholder: element.extraAttributes.placeholder,
			required: element.extraAttributes.required,
			options: element.extraAttributes.options,
		},
	});
	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);
	function applyChanges(values: PropertiesFormSchemaType) {
		const { label, placeholder, helperText, required, options } = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				placeholder,
				helperText,
				required,
				options
			},
		});
		toast({
			title: "Saved",
			description: "Properties saved successfully",
		})

		setSelectedElement(null)
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(applyChanges)}
			>
				<FormField
					control={form.control}
					name='label'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input
									onKeyDown={e => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The label of the field <br /> it will be displayed above the field
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='placeholder'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Placeholder</FormLabel>
							<FormControl>
								<Input
									onKeyDown={e => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
									{...field}
								/>
							</FormControl>
							<FormDescription>The placeholer of the field</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='helperText'
					render={({ field }) => (
						<FormItem>
							<FormLabel>HelperText</FormLabel>
							<FormControl>
								<Input
									onKeyDown={e => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
									{...field}
								/>
							</FormControl>
							<FormDescription>The placeholer of the field</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator className='my-2' />
				<FormField
					control={form.control}
					name='options'
					render={({ field }) => (
						<FormItem>
							<div className='flex justify-between items-center'>
								<FormLabel>Options</FormLabel>
								<Button
									variant={"outline"}
									onClick={e => {
										e.preventDefault(); //avoid submit;
										form.setValue("options", field.value.concat("New option "));
									}}
								>
									<AiOutlinePlus />
									Add
								</Button>
							</div>

							<div className='flex flex-col gap-2'>
								{form.watch("options").map((option, index) => (
									<div key={index} className='flex justify-between  items-center gap-1'>
										<Input
											placeholder=''
											value={option}
											onChange={e => {
												field.value[index] = e.target.value;
												field.onChange(field.value);
											}}
										/>
										<Button
											variant={"ghost"}
											size={"icon"}
											onClick={e => {
												e.preventDefault();
												const newOptions = [...field.value];
												newOptions.splice(index, 1);
												field.onChange(newOptions);
											}}
										>
											<AiOutlineClose />
										</Button>
									</div>
								))}
							</div>

							<FormDescription>The placeholer of the field</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator className='my-2' />

				<FormField
					control={form.control}
					name='required'
					render={({ field }) => (
						<FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
							<div className='space-y-0 5'>
								<FormLabel>Required</FormLabel>
								<FormDescription>Is field required? </FormDescription>
							</div>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator className='my-2' />
				<Button className='w-full' type='submit'>
					Save
				</Button>
			</form>
		</Form>
	);
}



export default SelectFieldPropertiesComponent;
