"use client";

import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface LanguageFilterProps {
  selectedLanguages?: string[];
  onChange?: (selectedLanguages: string[]) => void;
}

export default function LanguageFilter({
  selectedLanguages = [],
  onChange,
}: LanguageFilterProps) {
  const [selected, setSelected] = useState<string[]>(selectedLanguages);
  const languages = ["Finnish", "English", "Swedish"];

  const handleChange = (language: string, checked: boolean) => {
    let newSelected;
    if (checked) {
      newSelected = [...selected, language];
    } else {
      newSelected = selected.filter((lang) => lang !== language);
    }

    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">Languages</h3>
      {languages.map((language) => (
        <div key={language} className="flex items-center space-x-2">
          <Checkbox
            id={`language-${language}`}
            checked={selected.includes(language)}
            onCheckedChange={(checked) =>
              handleChange(language, checked === true)
            }
          />
          <Label
            htmlFor={`language-${language}`}
            className="text-sm cursor-pointer"
          >
            {language}
          </Label>
        </div>
      ))}
    </div>
  );
}
