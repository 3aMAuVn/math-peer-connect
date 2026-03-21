import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Search, Users, BookOpen, MessageCircle, Filter, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const studentsSeed = [
  {
    id: 1,
    name: "Ava",
    level: "Year 7",
    interests: ["Fractions", "Geometry", "Puzzles"],
    goal: "Find a study buddy for weekly problem solving.",
    bio: "I like fun visual maths and short challenge questions.",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Noah",
    level: "Year 7",
    interests: ["Algebra", "Games"],
    goal: "Practice algebra after school.",
    bio: "I enjoy turning maths into games.",
    availability: "Mon & Wed",
  },
  {
    id: 3,
    name: "Mia",
    level: "Year 9",
    interests: ["Geometry", "Olympiad", "Logic"],
    goal: "Join a small challenge group.",
    bio: "I love hard problems and patterns.",
    availability: "Tue & Thu",
  },
  {
    id: 4,
    name: "Liam",
    level: "Year 9",
    interests: ["Algebra", "Functions"],
    goal: "Prepare for tests with classmates.",
    bio: "I want to get more confident before exams.",
    availability: "After school",
  },
  {
    id: 5,
    name: "Ella",
    level: "Year 11",
    interests: ["Calculus", "Probability"],
    goal: "Talk through hard exam questions.",
    bio: "I like step-by-step explanations and exam strategies.",
    availability: "Friday afternoons",
  },
];

const postsSeed = [
  {
    id: 1,
    author: "Ava",
    level: "Year 7",
    text: "Who wants to solve 3 fun geometry puzzles this weekend?",
    tags: ["Geometry", "Puzzles"],
  },
  {
    id: 2,
    author: "Mia",
    level: "Year 9",
    text: "I made a small logic challenge. Want to try it together?",
    tags: ["Logic", "Challenge"],
  },
  {
    id: 3,
    author: "Ella",
    level: "Year 11",
    text: "Looking for someone to revise derivatives with after class.",
    tags: ["Calculus"],
  },
];

const groupsSeed = [
  { id: 1, name: "Year 7 Puzzle Club", level: "Year 7", topic: "Puzzles", members: 12, meeting: "Saturday 10:00 AM" },
  { id: 2, name: "Year 9 Algebra Circle", level: "Year 9", topic: "Algebra", members: 8, meeting: "Wednesday 4:30 PM" },
  { id: 3, name: "Year 11 Calculus Crew", level: "Year 11", topic: "Calculus", members: 10, meeting: "Friday 5:00 PM" },
];

const chatSeed = [
  { id: 1, from: "Mia", text: "Hi! Want to join our Year 9 challenge group?" },
  { id: 2, from: "You", text: "Yes, I like geometry and logic questions." },
  { id: 3, from: "Mia", text: "Great. We meet online every Tuesday." },
];

const levels = ["All", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"];

export default function MathPeerConnectApp() {
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(postsSeed);
  const [chatMessages, setChatMessages] = useState(chatSeed);
  const [chatInput, setChatInput] = useState("");
  const [profile, setProfile] = useState({
    name: "You",
    level: "Year 9",
    interests: "Geometry, Algebra",
    goal: "Find two students to study with every week.",
  });

  const currentInterestList = useMemo(
    () => profile.interests.split(",").map((item) => item.trim()).filter(Boolean),
    [profile.interests]
  );

  const filteredStudents = useMemo(() => {
    return studentsSeed
      .filter((student) => {
        const matchesLevel = selectedLevel === "All" || student.level === selectedLevel;
        const matchesSearch =
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.interests.join(" ").toLowerCase().includes(search.toLowerCase()) ||
          student.goal.toLowerCase().includes(search.toLowerCase()) ||
          student.bio.toLowerCase().includes(search.toLowerCase());
        return matchesLevel && matchesSearch;
      })
      .map((student) => {
        const shared = student.interests.filter((interest) => currentInterestList.includes(interest));
        return {
          ...student,
          matchScore: shared.length,
          shared,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [search, selectedLevel, currentInterestList]);

  const filteredGroups = useMemo(() => {
    return groupsSeed.filter((group) => {
      const matchesLevel = selectedLevel === "All" || group.level === selectedLevel;
      const matchesSearch =
        group.name.toLowerCase().includes(search.toLowerCase()) ||
        group.topic.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [search, selectedLevel]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesLevel = selectedLevel === "All" || post.level === selectedLevel;
      const matchesSearch =
        post.text.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.join(" ").toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [posts, search, selectedLevel]);

  const addPost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: posts.length + 1,
      author: profile.name,
      level: selectedLevel === "All" ? profile.level : selectedLevel,
      text: postText,
      tags: currentInterestList.length ? [currentInterestList[0]] : ["Study"],
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { id: prev.length + 1, from: "You", text: chatInput }]);
    setChatInput("");
  };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-8 shadow-sm"
        >
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <Badge className="rounded-full px-3 py-1 text-sm">Math Peer Connect</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Help students at the same math level find each other, chat, and learn together.
              </h1>
              <p className="max-w-2xl text-base text-slate-600">
                A simple community app where students can match by school year, discover shared math interests,
                join study groups, and post practice questions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl">Get started</Button>
                <Button variant="outline" className="rounded-2xl">See demo</Button>
              </div>
            </div>
            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Quick stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">120</div>
                  <div className="text-sm text-slate-600">Students</div>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-sm text-slate-600">Study groups</div>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm text-slate-600">Questions shared</div>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">9</div>
                  <div className="text-sm text-slate-600">Topics</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 shadow-sm h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="h-5 w-5" /> Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search interests, topics..."
                    className="rounded-2xl pl-9"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Math level</p>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`rounded-full px-3 py-1 text-sm transition ${
                          selectedLevel === level
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                  Tip: students can be matched by year level, topic interest, and learning goals.
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your name"
                  className="rounded-2xl"
                />
                <Input
                  value={profile.level}
                  onChange={(e) => setProfile({ ...profile, level: e.target.value })}
                  placeholder="Year level"
                  className="rounded-2xl"
                />
                <Input
                  value={profile.interests}
                  onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                  placeholder="Interests, separated by commas"
                  className="rounded-2xl"
                />
                <Textarea
                  value={profile.goal}
                  onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                  placeholder="Your study goal"
                  className="min-h-[100px] rounded-2xl"
                />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="students" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 rounded-2xl">
              <TabsTrigger value="students" className="rounded-2xl"><Users className="mr-2 h-4 w-4" /> Students</TabsTrigger>
              <TabsTrigger value="groups" className="rounded-2xl"><BookOpen className="mr-2 h-4 w-4" /> Groups</TabsTrigger>
              <TabsTrigger value="feed" className="rounded-2xl"><MessageCircle className="mr-2 h-4 w-4" /> Feed</TabsTrigger>
              <TabsTrigger value="chat" className="rounded-2xl"><MessageCircle className="mr-2 h-4 w-4" /> Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="rounded-3xl border-0 shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{student.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        <div className="text-sm text-slate-500">{student.level}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {student.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="rounded-full">{interest}</Badge>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>{student.goal}</p>
                      <p>{student.bio}</p>
                      <p><span className="font-medium text-slate-700">Available:</span> {student.availability}</p>
                    </div>
                    <div className="space-y-3">
                      {student.shared.length > 0 && (
                        <div className="rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
                          <span className="font-medium">Shared interests:</span> {student.shared.join(", ")}
                        </div>
                      )}
                      <Button className="w-full rounded-2xl">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="groups" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="rounded-3xl border-0 shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <div className="font-semibold text-slate-900">{group.name}</div>
                      <div className="text-sm text-slate-500">{group.level}</div>
                    </div>
                    <Badge className="rounded-full">{group.topic}</Badge>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>{group.members} members</p>
                      <p>Next meeting: {group.meeting}</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl">Join group</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="feed" className="space-y-4">
              <Card className="rounded-3xl border-0 shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <PlusCircle className="h-5 w-5" /> Share a math post
                  </div>
                  <Textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Ask a question, invite students to study, or share a math challenge..."
                    className="min-h-[110px] rounded-2xl"
                  />
                  <div className="flex justify-end">
                    <Button className="rounded-2xl" onClick={addPost}>Post</Button>
                  </div>
                </CardContent>
              </Card>

              {filteredPosts.map((post) => (
                <Card key={post.id} className="rounded-3xl border-0 shadow-sm">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{post.author}</div>
                        <div className="text-sm text-slate-500">{post.level}</div>
                      </div>
                      <Button variant="ghost" className="rounded-2xl">Reply</Button>
                    </div>
                    <p className="text-slate-700">{post.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full">#{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <Card className="rounded-3xl border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Private chat demo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          message.from === "You" ? "ml-auto bg-slate-900 text-white" : "bg-white text-slate-700"
                        }`}
                      >
                        <div className="mb-1 text-xs font-semibold opacity-80">{message.from}</div>
                        <div>{message.text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                      className="rounded-2xl"
                    />
                    <Button className="rounded-2xl" onClick={sendMessage}>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}