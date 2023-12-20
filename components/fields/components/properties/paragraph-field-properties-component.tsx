import { FormElementInstance } from "@/components/form-elements";
import React, { useEffect } from "react";
import { CustomInstance, propertiesSchema } from "../../paragraph-field";
import useDesignerContext from "@/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function ParagraphFieldPropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const { updateElement } = useDesignerContext();
	const element = elementInstance as CustomInstance;
	const form = useForm<PropertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			text: element.extraAttributes.text,
		},
	});
	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);
	function applyChanges(values: PropertiesFormSchemaType) {
		const { text } = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				text,
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
					name='text'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Text</FormLabel>
							<FormControl>
								<Textarea
									rows={5}
									onKeyDown={e => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}



export default ParagraphFieldPropertiesComponent;
