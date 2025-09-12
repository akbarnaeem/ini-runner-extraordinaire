import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type SkillCategory = 'tech' | 'soft' | 'domain';

interface SkillBadgeProps {
  name: string;
  level?: SkillLevel;
  category?: SkillCategory;
  percentage?: number;
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  level = 'beginner',
  category = 'tech',
  percentage,
  className,
  showPercentage = false,
  variant = 'default'
}) => {
  const levelColors = {
    beginner: 'bg-career-beginner hover:bg-career-beginner/80',
    intermediate: 'bg-career-intermediate hover:bg-career-intermediate/80',
    advanced: 'bg-career-advanced hover:bg-career-advanced/80',
    expert: 'bg-career-expert hover:bg-career-expert/80'
  };

  const categoryColors = {
    tech: 'bg-skillCategory-tech hover:bg-skillCategory-tech/80',
    soft: 'bg-skillCategory-soft hover:bg-skillCategory-soft/80',
    domain: 'bg-skillCategory-domain hover:bg-skillCategory-domain/80'
  };

  const getColorClass = () => {
    if (variant === 'outline') return '';
    return category ? categoryColors[category] : levelColors[level];
  };

  return (
    <Badge 
      variant={variant}
      className={cn(
        "transition-smooth text-white border-0",
        getColorClass(),
        className
      )}
    >
      {name}
      {showPercentage && percentage !== undefined && (
        <span className="ml-1 text-xs opacity-90">
          {percentage}%
        </span>
      )}
    </Badge>
  );
};