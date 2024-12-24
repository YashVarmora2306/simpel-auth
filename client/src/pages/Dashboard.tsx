import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  // console.log(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Welcome, {user?.name || "User"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            You are successfully logged.
          </p>
          <div className="mt-4">
            <Button onClick={logout} variant="destructive" className="w-full">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
