import { FormElementInstance } from "@/components/form-elements";
import React, { useEffect } from "react";
import { CustomInstance, propertiesSchema } from "../../date-field";
import useDesignerContext from "@/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
export default function DateFieldPropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const { updateElement } = useDesignerContext();
	const element = elementInstance as CustomInstance;
	const form = useForm<PropertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
		},
	});
	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);
	function applyChanges(values: PropertiesFormSchemaType) {
		const { label, helperText, required } = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				required,
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



