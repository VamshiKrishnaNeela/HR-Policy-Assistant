import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: IconProps) {
  const IconComponent = (Icons as unknown as Record<string, Icons.LucideIcon>)[name];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <Icons.FileText className={className} />;
}
