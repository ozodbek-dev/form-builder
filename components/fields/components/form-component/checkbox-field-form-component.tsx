import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import  { CustomInstance } from "../../text-field";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import CheckBoxFieldFormElement from "../../checkbox-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}

export default function CheckboxFieldFormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: IProps) {
	const element = elementInstance as CustomInstance;
	const { label, helperText, required } = element.extraAttributes;
	const [value, setValue] = useState<boolean>(defaultValue === "true");
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		setError(isInvalid === true);
	}, [isInvalid]);

const id = `checkbox-${element.id}`;
return (
	<div className='flex items-top  space-x-2 '>
		<Checkbox
			id={id}
			checked={value}
			className={cn(error && "border-red-500")}
			onCheckedChange={checked => {
				let value = false;

				if (checked === true) value = true;
				setValue(value);
				if (!submitValue) return;
				let strValue = value ? "true" : "false";
				const valid = CheckBoxFieldFormElement.validate(element, strValue);

				setError(!valid);
				submitValue(element.id, strValue);
			}}
		/>
		<div className='grid gap-1.5 leading-none'>
			<Label className={cn(error && "text-red-500")}>
				{label} {required && "*"}
			</Label>
			{helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500" )}>{helperText}</p>}
		</div>
	</div>
);
}
