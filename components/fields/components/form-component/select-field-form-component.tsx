import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import  { CustomInstance, SelectFieldFormElement } from "../../select-field";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}

export default function SelectFieldFormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: IProps) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required, options } = element.extraAttributes;
	const [value, setValue] = useState<string>(defaultValue || "");
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		setError(isInvalid === true);
	}, [isInvalid]);

	console.log(options)

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label className={cn(error && "text-red-500")}>
				{label} {required && "*"}
			</Label>
			<Select
				defaultValue={value}
				onValueChange={value => {
					setValue(value);
					if (!submitValue) return;
					const valid = SelectFieldFormElement.validate(element, value);
					setError(!valid);
					submitValue(element.id, value);
				}}
			>
				<SelectTrigger className={cn("w-full", error && "border-red-500")}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map(option => (
						<SelectItem key={option} value={option}>{option}</SelectItem>
					))}
				</SelectContent>
			</Select>
			{helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
		</div>
	);
}
