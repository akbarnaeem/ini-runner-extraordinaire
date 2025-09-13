import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { SkillHeatmap } from '@/components/dashboard/skill-heatmap';
import { CareerRecommendations } from '@/components/dashboard/career-recommendations';
import { SkillQuiz } from '@/components/quiz/skill-quiz';
import { CareerChatbot } from '@/components/chatbot/career-chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import heroImage from '@/assets/hero-career.jpg';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Award,
  Users,
  Zap,
  ArrowRight,
  Play
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              AI-Powered
              <span className="block bg-gradient-to-r from-white to-skill-light bg-clip-text text-transparent">
                Career Guidance
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Discover your perfect career path with personalized AI recommendations, 
              skill assessments, and interactive learning paths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
                onClick={() => setActiveTab('quiz')}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Skill Assessment
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with AI Advisor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Everything You Need for
              <span className="bg-gradient-to-r from-primary to-skill bg-clip-text text-transparent">
                {" "}Career Success
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines AI intelligence with expert insights 
              to accelerate your professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "AI-Powered Insights",
                description: "Get personalized career recommendations based on your skills and market trends.",
                color: "skill"
              },
              {
                icon: Target,
                title: "Skill Assessment",
                description: "Comprehensive quizzes to identify your strengths and growth opportunities.",
                color: "primary"
              },
              {
                icon: TrendingUp,
                title: "Market Analysis",
                description: "Real-time job market data and salary insights for informed decisions.",
                color: "success"
              },
              {
                icon: BookOpen,
                title: "Learning Paths",
                description: "Curated courses and resources tailored to your career goals.",
                color: "career-intermediate"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border border-border elegant-shadow bg-card">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 border-2 border-primary/20">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-20">
        <div className="container px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-2xl grid-cols-4 lg:grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Assessment</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Careers</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Chat</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">Your Skills Dashboard</h2>
                <p className="text-muted-foreground text-lg">
                  Track your progress and identify areas for growth
                </p>
              </div>
              <SkillHeatmap />
            </TabsContent>

            <TabsContent value="quiz" className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">Skill Assessment</h2>
                <p className="text-muted-foreground text-lg">
                  Discover your strengths and get personalized recommendations
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <SkillQuiz />
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">Career Recommendations</h2>
                <p className="text-muted-foreground text-lg">
                  AI-powered career paths tailored to your profile
                </p>
              </div>
              <CareerRecommendations />
            </TabsContent>

            <TabsContent value="chat" className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">AI Career Advisor</h2>
                <p className="text-muted-foreground text-lg">
                  Get instant answers to your career questions
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <CareerChatbot />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers with CareerAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Professionals Guided" },
              { number: "95%", label: "Career Success Rate" },
              { number: "200+", label: "Skill Categories" },
              { number: "1000+", label: "Learning Resources" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="career-shadow border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-16 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Ready to Transform
                      <span className="block bg-gradient-to-r from-primary to-skill bg-clip-text text-transparent">
                        Your Career?
                      </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Start your personalized career journey today. Get AI-powered insights, 
                      skill assessments, and curated learning paths.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="hero-gradient text-white border-0 hover:opacity-90 transition-opacity"
                      onClick={() => setActiveTab('quiz')}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Get Started Free
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Join Community
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-12 lg:p-16 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto hero-gradient rounded-full flex items-center justify-center">
                      <Brain className="h-12 w-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">AI-Powered</h3>
                      <p className="text-muted-foreground">
                        Advanced algorithms analyze market trends and personal skills
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
