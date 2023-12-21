import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import { CustomInstance } from "../../number-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NumberFieldFormElement from "../../number-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}

export default function NumberFieldFormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: IProps) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required} = element.extraAttributes;
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
			<Input
				placeholder={placeholder}
				type="number"
				className={cn(error && "border-red-500")}
				onChange={e => setValue(e.target.value)}
				onBlur={e => {
					if (!submitValue) return;
					const valid = NumberFieldFormElement.validate(element, e.target.value);
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
