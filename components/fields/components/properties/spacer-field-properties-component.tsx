import { FormElementInstance } from "@/components/form-elements";
import React, { useEffect } from "react";
import { CustomInstance, propertiesSchema } from "../../spacer-field";
import useDesignerContext from "@/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function SpacerFieldPropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const { updateElement } = useDesignerContext();
	const element = elementInstance as CustomInstance;
	const form = useForm<PropertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			height: element.extraAttributes.height,
		},
	});
	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);
	function applyChanges(values: PropertiesFormSchemaType) {
		const { height } = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				height,
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
					name='height'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Height (px):{form.watch('height')}</FormLabel>
							<FormControl className="pt-2">
								<Slider defaultValue={[field.value]} min={5} max={200} step={1} onValueChange={(value) => {
									field.onChange(value[0]);
								}}/>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}



export default SpacerFieldPropertiesComponent;
