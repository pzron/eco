import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Compare Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Compare your selected products side by side.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
