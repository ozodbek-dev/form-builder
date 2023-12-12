"use client"
import { DesignerContext } from "@/components/context/designer-context"
import React, { useContext } from "react"

function DragOverlayWrapper() {
  const context = useContext(DesignerContext)
  if (!context) {
    throw new Error("useDesigner must be used withing a DesignerContext")
  }
  return context
}