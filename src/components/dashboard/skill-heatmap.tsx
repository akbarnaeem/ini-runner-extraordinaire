import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { SkillBadge } from '@/components/ui/skill-badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, BookOpen } from 'lucide-react';

interface Skill {
  name: string;
  category: 'tech' | 'soft' | 'domain';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  percentage: number;
  trending?: boolean;
  inDemand?: boolean;
}

interface SkillHeatmapProps {
  skills?: Skill[];
}

export const SkillHeatmap: React.FC<SkillHeatmapProps> = ({ skills }) => {
  const defaultSkills: Skill[] = [
    { name: 'Python', category: 'tech', level: 'advanced', percentage: 85, trending: true },
    { name: 'Machine Learning', category: 'tech', level: 'intermediate', percentage: 70, inDemand: true },
    { name: 'Leadership', category: 'soft', level: 'intermediate', percentage: 65 },
    { name: 'Data Analysis', category: 'domain', level: 'advanced', percentage: 80, trending: true },
    { name: 'React', category: 'tech', level: 'expert', percentage: 92 },
    { name: 'Communication', category: 'soft', level: 'advanced', percentage: 88 },
    { name: 'SQL', category: 'tech', level: 'advanced', percentage: 78 },
    { name: 'Problem Solving', category: 'soft', level: 'expert', percentage: 90 },
    { name: 'Cloud Computing', category: 'tech', level: 'beginner', percentage: 35, inDemand: true },
    { name: 'Project Management', category: 'soft', level: 'intermediate', percentage: 60 }
  ];

  const skillsData = skills || defaultSkills;
  const averageSkillLevel = Math.round(skillsData.reduce((acc, skill) => acc + skill.percentage, 0) / skillsData.length);

  const getSkillsByCategory = (category: string) => 
    skillsData.filter(skill => skill.category === category);

  const topSkills = skillsData
    .filter(skill => skill.percentage >= 80)
    .sort((a, b) => b.percentage - a.percentage);

  const skillsToImprove = skillsData
    .filter(skill => skill.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="career-shadow border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-primary">{averageSkillLevel}%</p>
              </div>
              <ProgressRing percentage={averageSkillLevel} size={60} strokeWidth={6} color="primary">
                <span className="text-xs font-medium text-primary">{averageSkillLevel}%</span>
              </ProgressRing>
            </div>
          </CardContent>
        </Card>

        <Card className="skill-shadow border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Strong Skills</p>
                <p className="text-2xl font-bold text-skill">{topSkills.length}</p>
              </div>
              <div className="w-12 h-12 bg-skill/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-skill" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-shadow border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth Areas</p>
                <p className="text-2xl font-bold text-career-intermediate">{skillsToImprove.length}</p>
              </div>
              <div className="w-12 h-12 bg-career-intermediate/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-career-intermediate" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="skill-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg">Technical Skills</CardTitle>
            <CardDescription>Programming, tools, and technologies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getSkillsByCategory('tech').map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <SkillBadge 
                  name={skill.name} 
                  category={skill.category}
                  level={skill.level}
                  variant="outline"
                />
                <div className="flex items-center space-x-2">
                  {skill.trending && <TrendingUp className="h-3 w-3 text-career-intermediate" />}
                  <ProgressRing percentage={skill.percentage} size={40} strokeWidth={4} color="skill">
                    <span className="text-xs font-medium">{skill.percentage}%</span>
                  </ProgressRing>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="elegant-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg">Soft Skills</CardTitle>
            <CardDescription>Communication and leadership abilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getSkillsByCategory('soft').map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <SkillBadge 
                  name={skill.name} 
                  category={skill.category}
                  level={skill.level}
                  variant="outline"
                />
                <div className="flex items-center space-x-2">
                  {skill.inDemand && <Target className="h-3 w-3 text-success" />}
                  <ProgressRing percentage={skill.percentage} size={40} strokeWidth={4} color="success">
                    <span className="text-xs font-medium">{skill.percentage}%</span>
                  </ProgressRing>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="career-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg">Domain Knowledge</CardTitle>
            <CardDescription>Industry-specific expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getSkillsByCategory('domain').map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <SkillBadge 
                  name={skill.name} 
                  category={skill.category}
                  level={skill.level}
                  variant="outline"
                />
                <div className="flex items-center space-x-2">
                  {skill.trending && <TrendingUp className="h-3 w-3 text-career-intermediate" />}
                  <ProgressRing percentage={skill.percentage} size={40} strokeWidth={4} color="career">
                    <span className="text-xs font-medium">{skill.percentage}%</span>
                  </ProgressRing>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="success-gradient text-white border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Your Strongest Skills</span>
            </CardTitle>
            <CardDescription className="text-white/80">
              Keep leveraging these in your career
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topSkills.slice(0, 3).map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-white/80">{skill.percentage}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-career-intermediate border-2">
          <CardHeader>
            <CardTitle className="text-career-intermediate flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Growth Opportunities</span>
            </CardTitle>
            <CardDescription>
              Focus areas for career advancement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {skillsToImprove.slice(0, 3).map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{skill.name}</span>
                <Button size="sm" variant="outline" className="border-career-intermediate text-career-intermediate hover:bg-career-intermediate hover:text-white">
                  Learn
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};