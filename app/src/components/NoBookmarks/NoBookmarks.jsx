import './NoBookmarks.css';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
function NoBookmarks() {
  return (
    <div className="no-bookmarks">
         <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>No bookmarks found</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 text-sm">
          You don't have any bookmarks yet. Add one to get started.</p>
      </CardContent>
    </Card>
    </div>
  );
}

export default NoBookmarks;

