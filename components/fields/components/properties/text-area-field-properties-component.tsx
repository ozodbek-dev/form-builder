import { FormElementInstance } from "@/components/form-elements";
import React, { useEffect } from "react";
import { CustomInstance, propertiesSchema } from "../../text-area-field";
import useDesignerContext from "@/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function TextAreaFieldPropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const { updateElement } = useDesignerContext();
	const element = elementInstance as CustomInstance;
	const form = useForm<PropertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			placeholder: element.extraAttributes.placeholder,
			required: element.extraAttributes.required,
			rows: element.extraAttributes.rows
		},
	});
	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);
	function applyChanges(values: PropertiesFormSchemaType) {
		const { label, placeholder, helperText, required,rows } = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				placeholder,
				helperText,
				required,
				rows
			}, 
		});
	}
	return (
		<Form {...form}>
			<form
				onBlur={form.handleSubmit(applyChanges)}
				onSubmit={e => {
					e.preventDefault();
				}}
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
					name='rows'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rows {form.watch("rows")}</FormLabel>
							<FormControl>
								<Slider
									defaultValue={[field.value]}
									min={1}
									max={10}
									step={1}
									onValueChange={value => field.onChange(value[0])}
								/>
							</FormControl>
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
			</form>
		</Form>
	);
}



export default TextAreaFieldPropertiesComponent;
