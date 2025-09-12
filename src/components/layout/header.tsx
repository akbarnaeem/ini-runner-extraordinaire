import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BrainCircuit, User, Settings, LogOut, Trophy } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
    points: number;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const defaultUser = {
    name: 'Alex Johnson',
    points: 1250
  };

  const currentUser = user || defaultUser;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-skill bg-clip-text text-transparent">
              CareerAI
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Skills
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Courses
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Career Paths
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-career-intermediate" />
            <Badge variant="outline" className="text-career-intermediate border-career-intermediate">
              {currentUser.points} pts
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.points} career points
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};