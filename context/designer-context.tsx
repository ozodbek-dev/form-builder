"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, use, useState } from "react";
import { FormElementInstance } from "../components/form-elements";

type DesignerContextType = {
	elements: FormElementInstance[];
	addElement: (index: number, element: FormElementInstance) => void;
	removeElement: (id: string) => void;
	updateElement:(id:string, element:FormElementInstance)=>void
	selectedElement: FormElementInstance | null;
	setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
	
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
	const [selectedElement, setSelectedElement] = useState<FormElementInstance|null>(null)
	const [elements, setElements] = useState<FormElementInstance[]>([]);
	const addElement = (index: number, element: FormElementInstance) => {
		setElements(prev => {
			const newElements = [...prev];
			newElements.splice(index, 0, element);
			return newElements;
		});
	};
	const removeElement = (id: string) => {
		setElements(prev =>  prev.filter(element => element.id !== id))
	}

	const updateElement = (id: string, element: FormElementInstance) => {
		setElements(prev => {
			const newElements = [...prev];
			const index = newElements.findIndex(element => element.id === id);
			newElements[index] = element;
			return newElements;
		})
	}
	return (
		<DesignerContext.Provider
			value={{
				elements,
				addElement,
				removeElement,
				selectedElement,
				setSelectedElement,
				updateElement,
			}}
		>
			{children}
		</DesignerContext.Provider>
	);
}
