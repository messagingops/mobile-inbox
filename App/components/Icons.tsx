import React from 'react';
import { icons } from 'lucide-react-native';

interface IconProps {
  name: string; 
  color?: string; 
  size?: number; 
}

const Icon: React.FC<IconProps> = ({ name, color, size }) => {
  const LucideIcon = icons[name as keyof typeof icons]; 

  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist in lucide-react-native`);
    return null;
  }
  return <LucideIcon color={color} size={size} />;
};

export default Icon;
