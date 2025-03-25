"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { createClient } from "../../supabase/client";

interface CourseType {
  id: string;
  name: string;
}

interface CourseTypesFilterProps {
  selectedTypes?: string[];
  onChange?: (selectedIds: string[]) => void;
}

export default function CourseTypesFilter({
  selectedTypes = [],
  onChange,
}: CourseTypesFilterProps) {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedTypes);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCourseTypes() {
      const { data, error } = await supabase
        .from("course_types")
        .select("id, name")
        .order("name");

      if (!error && data) {
        setCourseTypes(data);
      }
    }

    fetchCourseTypes();
  }, [supabase]);

  const handleChange = (typeId: string, checked: boolean) => {
    let newSelected;
    if (checked) {
      newSelected = [...selected, typeId];
    } else {
      newSelected = selected.filter((id) => id !== typeId);
    }

    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">Course Types</h3>
      {courseTypes.length > 0 ? (
        courseTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox
              id={`course-${type.id}`}
              checked={selected.includes(type.id)}
              onCheckedChange={(checked) =>
                handleChange(type.id, checked === true)
              }
            />
            <Label
              htmlFor={`course-${type.id}`}
              className="text-sm cursor-pointer"
            >
              {type.name}
            </Label>
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-500">Loading course types...</div>
      )}

      {/* Fallback if no course types are found after loading */}
      {courseTypes.length === 0 && (
        <div className="text-sm text-gray-500">No course types available</div>
      )}
    </div>
  );
}
