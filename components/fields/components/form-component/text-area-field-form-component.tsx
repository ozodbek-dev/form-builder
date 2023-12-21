import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import { CustomInstance } from "../../text-area-field";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import TextAreaFieldFormElement from "../../text-area-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
	rows?:number
}

export default function TextAreaFieldFormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: IProps) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required,rows } = element.extraAttributes;
	const [value, setValue] = useState<string>(defaultValue || "");
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		setError(isInvalid === true);
	}, [isInvalid]);

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label className={cn(error && "text-red-500")}>
				{label} {required && "*"}
			</Label>
			<Textarea
				rows={rows}
				placeholder={placeholder}
				className={cn(error && "border-red-500")}
				onChange={e => setValue(e.target.value)}
				onBlur={e => {
					if (!submitValue) return;
					const valid = TextAreaFieldFormElement.validate(element, e.target.value);
					setError(!valid);
					if (!valid) return;
					submitValue(element.id, value);
				}}
				value={value}
			/>
			{helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
		</div>
	);
}
