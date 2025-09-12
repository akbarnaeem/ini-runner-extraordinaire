import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/ui/progress-ring';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  MapPin, 
  ArrowRight,
  Star,
  Users,
  Briefcase
} from 'lucide-react';

interface CareerPath {
  id: number;
  title: string;
  description: string;
  matchScore: number;
  salaryRange: { min: number; max: number };
  growthOutlook: 'high' | 'medium' | 'low';
  timeToTransition: string;
  requiredSkills: string[];
  skillGaps: string[];
  companies: string[];
  demandScore: number;
}

interface CareerRecommendationsProps {
  recommendations?: CareerPath[];
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ 
  recommendations 
}) => {
  const defaultRecommendations: CareerPath[] = [
    {
      id: 1,
      title: "Senior Data Scientist",
      description: "Lead data science initiatives and mentor junior team members while solving complex business problems.",
      matchScore: 92,
      salaryRange: { min: 120000, max: 180000 },
      growthOutlook: "high",
      timeToTransition: "8-12 months",
      requiredSkills: ["Python", "Machine Learning", "Statistical Analysis", "Leadership"],
      skillGaps: ["Deep Learning", "MLOps"],
      companies: ["Google", "Netflix", "Spotify"],
      demandScore: 95
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      description: "Design and implement ML systems that scale across millions of users.",
      matchScore: 88,
      salaryRange: { min: 130000, max: 200000 },
      growthOutlook: "high",
      timeToTransition: "6-10 months",
      requiredSkills: ["Python", "TensorFlow", "Cloud Platforms", "DevOps"],
      skillGaps: ["Kubernetes", "Model Deployment"],
      companies: ["OpenAI", "Meta", "Microsoft"],
      demandScore: 98
    },
    {
      id: 3,
      title: "Product Manager - AI",
      description: "Drive AI product strategy and work cross-functionally to bring AI features to market.",
      matchScore: 76,
      salaryRange: { min: 140000, max: 220000 },
      growthOutlook: "high",
      timeToTransition: "12-18 months",
      requiredSkills: ["Product Strategy", "AI Understanding", "Analytics", "Communication"],
      skillGaps: ["Product Management", "Market Research", "Stakeholder Management"],
      companies: ["Adobe", "Salesforce", "Uber"],
      demandScore: 89
    }
  ];

  const careerPaths = recommendations || defaultRecommendations;

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`;
  };

  const getGrowthColor = (outlook: string) => {
    switch (outlook) {
      case 'high': return 'text-success bg-success/10';
      case 'medium': return 'text-career-intermediate bg-career-intermediate/10';
      case 'low': return 'text-career-advanced bg-career-advanced/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-skill bg-clip-text text-transparent">
          AI-Powered Career Recommendations
        </h2>
        <p className="text-muted-foreground">
          Personalized career paths based on your skills, interests, and market demand
        </p>
      </div>

      <div className="grid gap-6">
        {careerPaths.map((career, index) => (
          <Card key={career.id} className="career-shadow hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
            <div className="relative">
              {index === 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-career-intermediate text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Best Match
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {career.description}
                    </CardDescription>
                  </div>
                  <ProgressRing 
                    percentage={career.matchScore} 
                    size={80} 
                    strokeWidth={6} 
                    color="primary"
                    className="flex-shrink-0"
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{career.matchScore}%</div>
                      <div className="text-xs text-muted-foreground">match</div>
                    </div>
                  </ProgressRing>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">{formatSalary(career.salaryRange.min, career.salaryRange.max)}</p>
                      <p className="text-xs text-muted-foreground">Salary</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-career-intermediate" />
                    <div>
                      <Badge variant="outline" className={getGrowthColor(career.growthOutlook)}>
                        {career.growthOutlook} growth
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{career.timeToTransition}</p>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-skill" />
                    <div>
                      <p className="text-sm font-medium">{career.demandScore}%</p>
                      <p className="text-xs text-muted-foreground">Demand</p>
                    </div>
                  </div>
                </div>

                {/* Skills Gap Analysis */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Skills to Develop
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skillGaps.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="outline" 
                        className="border-career-intermediate text-career-intermediate hover:bg-career-intermediate hover:text-white transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top Companies */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    Top Hiring Companies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.companies.map((company, companyIndex) => (
                      <Badge 
                        key={companyIndex} 
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <Button className="flex-1 hero-gradient text-white border-0 hover:opacity-90 transition-opacity">
                    View Learning Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Save Career
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Explore More */}
      <Card className="text-center py-8 border-dashed border-2 border-muted-foreground/20">
        <CardContent>
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Explore More Career Paths</h3>
              <p className="text-muted-foreground">
                Discover additional opportunities tailored to your profile
              </p>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Careers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};