import React, { useEffect, useMemo, useState } from "react";

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
  {
    id: 1,
    name: "Year 7 Puzzle Club",
    level: "Year 7",
    topic: "Puzzles",
    members: 12,
    meeting: "Saturday 10:00 AM",
    description:
      "A friendly group for puzzle lovers who enjoy short challenge questions.",
    posts: [
      { id: 101, author: "Moderator", text: "Welcome to Puzzle Club!", status: "active" },
      { id: 102, author: "Moderator", text: "Bring one favourite puzzle to share this week.", status: "active" },
    ],
  },
  {
    id: 2,
    name: "Year 9 Algebra Circle",
    level: "Year 9",
    topic: "Algebra",
    members: 8,
    meeting: "Wednesday 4:30 PM",
    description:
      "Work through algebra skills together and prepare for tests.",
    posts: [
      { id: 201, author: "Moderator", text: "This week: simplifying expressions.", status: "active" },
      { id: 202, author: "Moderator", text: "Post one tricky algebra question below.", status: "active" },
    ],
  },
  {
    id: 3,
    name: "Year 11 Calculus Crew",
    level: "Year 11",
    topic: "Calculus",
    members: 10,
    meeting: "Friday 5:00 PM",
    description:
      "Practice derivatives and exam-style questions as a team.",
    posts: [
      { id: 301, author: "Moderator", text: "Friday focus: derivative rules.", status: "active" },
      { id: 302, author: "Moderator", text: "Share one exam tip before the session.", status: "active" },
    ],
  },
];

const practiceData = {
  "Year 7": [
    {
      topic: "Fractions",
      sets: [
        {
          title: "Practice Set 1",
          questions: [
            {
              id: 1,
              question: "1/2 + 1/4 = ?",
              answer: "3/4",
              explanation:
                "Convert to quarters: 1/2 = 2/4, then 2/4 + 1/4 = 3/4.",
              commonMistake:
                "Forgetting to use the same denominator before adding.",
            },
            {
              id: 2,
              question: "3/5 - 1/5 = ?",
              answer: "2/5",
              explanation:
                "The denominator stays 5, so subtract only the numerators.",
              commonMistake: "Subtracting both numerator and denominator.",
            },
          ],
        },
        {
          title: "Challenge Set",
          questions: [
            {
              id: 3,
              question: "Which is greater: 2/3 or 3/5?",
              answer: "2/3",
              explanation:
                "Compare decimals: 2/3 ≈ 0.667 and 3/5 = 0.6.",
              commonMistake:
                "Comparing only the denominators instead of the values.",
            },
          ],
        },
      ],
    },
    {
      topic: "Decimals",
      sets: [
        {
          title: "Practice Set 1",
          questions: [
            {
              id: 4,
              question: "0.7 + 0.25 = ?",
              answer: "0.95",
              explanation: "Align decimal places before adding.",
              commonMistake: "Misaligning decimal places.",
            },
            {
              id: 5,
              question: "1.2 - 0.8 = ?",
              answer: "0.4",
              explanation:
                "Subtract tenths carefully: 12 tenths - 8 tenths = 4 tenths.",
              commonMistake: "Ignoring place value.",
            },
          ],
        },
      ],
    },
  ],
  "Year 9": [
    {
      topic: "Algebra",
      sets: [
        {
          title: "Practice Set 1",
          questions: [
            {
              id: 6,
              question: "Simplify: 3x + 2x",
              answer: "5x",
              explanation:
                "Combine like terms by adding the coefficients.",
              commonMistake:
                "Writing 6x^2 instead of combining like terms.",
            },
            {
              id: 7,
              question: "Solve: x + 4 = 11",
              answer: "x = 7",
              explanation: "Subtract 4 from both sides.",
              commonMistake: "Adding 4 instead of subtracting it.",
            },
          ],
        },
      ],
    },
    {
      topic: "Geometry",
      sets: [
        {
          title: "Practice Set 1",
          questions: [
            {
              id: 8,
              question: "What is the sum of angles in a triangle?",
              answer: "180°",
              explanation:
                "The interior angles of any triangle always add to 180°.",
              commonMistake:
                "Confusing a triangle with a quadrilateral.",
            },
          ],
        },
      ],
    },
  ],
  "Year 11": [
    {
      topic: "Calculus",
      sets: [
        {
          title: "Practice Set 1",
          questions: [
            {
              id: 9,
              question: "Differentiate: x^2",
              answer: "2x",
              explanation:
                "Use the power rule: d/dx(x^n) = nx^(n-1).",
              commonMistake:
                "Keeping the exponent as 2 after differentiating.",
            },
            {
              id: 10,
              question: "Differentiate: 5x^3",
              answer: "15x^2",
              explanation:
                "Multiply by the power, then reduce the exponent by 1.",
              commonMistake:
                "Forgetting to multiply by the original coefficient 5.",
            },
          ],
        },
      ],
    },
  ],
};

const initialMessages = [
  { id: 1, from: "Mia", text: "Hi! Want to join our Year 9 challenge group?" },
  { id: 2, from: "You", text: "Yes, I like geometry and logic questions." },
  { id: 3, from: "Mia", text: "Great. We meet online every Tuesday." },
];

const moderationReasons = [
  "Bullying",
  "Harmful content",
  "Spam",
  "Inappropriate language",
  "Other",
];

const levels = ["All", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"];
const practiceLevels = ["Year 7", "Year 9", "Year 11"];

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", padding: "24px", fontFamily: "Arial, sans-serif", color: "#0f172a" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  hero: { background: "#ffffff", borderRadius: "24px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "24px" },
  heroTitle: { fontSize: "36px", fontWeight: "700", marginBottom: "12px" },
  heroText: { fontSize: "16px", color: "#475569", lineHeight: 1.6 },
  layout: { display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px" },
  sidebar: { background: "#ffffff", borderRadius: "20px", padding: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", height: "fit-content" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "14px" },
  input: { width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #cbd5e1", marginBottom: "12px", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #cbd5e1", marginBottom: "12px", minHeight: "90px", boxSizing: "border-box", resize: "vertical" },
  tabs: { display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" },
  tabButton: (active) => ({ padding: "10px 16px", borderRadius: "999px", border: "none", cursor: "pointer", background: active ? "#0f172a" : "#e2e8f0", color: active ? "#ffffff" : "#0f172a", fontWeight: "600" }),
  pillButton: (active) => ({ padding: "8px 12px", borderRadius: "999px", border: "none", cursor: "pointer", margin: "4px", background: active ? "#0f172a" : "#e2e8f0", color: active ? "#ffffff" : "#0f172a" }),
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" },
  card: { background: "#ffffff", borderRadius: "18px", padding: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
  badge: { display: "inline-block", padding: "5px 9px", borderRadius: "999px", background: "#e2e8f0", marginRight: "6px", marginBottom: "6px", fontSize: "12px" },
  button: { padding: "10px 16px", borderRadius: "12px", border: "none", cursor: "pointer", background: "#0f172a", color: "#ffffff", fontWeight: "600", marginTop: "12px" },
  secondaryButton: { padding: "10px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", cursor: "pointer", background: "#ffffff", color: "#0f172a", fontWeight: "600", marginTop: "12px" },
  dangerButton: { padding: "8px 12px", borderRadius: "10px", border: "1px solid #fecaca", cursor: "pointer", background: "#fff1f2", color: "#9f1239", fontWeight: "600" },
  compactStudentCard: { background: "#ffffff", borderRadius: "18px", padding: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "8px" },
  chatBox: { background: "#ffffff", borderRadius: "20px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
  message: (isYou) => ({ maxWidth: "75%", marginLeft: isYou ? "auto" : "0", background: isYou ? "#0f172a" : "#f1f5f9", color: isYou ? "#ffffff" : "#0f172a", padding: "12px 14px", borderRadius: "14px", marginBottom: "10px" }),
  questionCard: { padding: "14px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: "12px" },
  progressBarOuter: { width: "100%", height: "14px", borderRadius: "999px", background: "#e2e8f0", overflow: "hidden", marginTop: "10px" },
};

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [posts, setPosts] = useState(postsSeed);
  const [newPost, setNewPost] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [groups, setGroups] = useState(groupsSeed);
  const [activeGroupId, setActiveGroupId] = useState(groupsSeed[0].id);
  const [groupPostText, setGroupPostText] = useState("");
  const [joinedGroupIds, setJoinedGroupIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [loginMode, setLoginMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [profile, setProfile] = useState({ name: "You", level: "Year 9", interests: "Geometry, Algebra", goal: "Find two students to study with every week." });
  const [practiceLevel, setPracticeLevel] = useState("Year 7");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [studentAnswers, setStudentAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [reports, setReports] = useState([]);
  const [reportDrafts, setReportDrafts] = useState({});
  const [moderationNote, setModerationNote] = useState("");
  const [mutedUsers, setMutedUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("math-peer-user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setProfile((prev) => ({ ...prev, ...parsedUser }));
      setIsLoggedIn(true);
    }
  }, []);

  const currentUserName = profile.name || "Student";
  const isCurrentUserMuted = mutedUsers.includes(currentUserName);
  const isCurrentUserBanned = bannedUsers.includes(currentUserName);

  const activeGroup = useMemo(() => groups.find((group) => group.id === activeGroupId) || groups[0], [groups, activeGroupId]);
  const currentInterestList = useMemo(() => profile.interests.split(",").map((item) => item.trim()).filter(Boolean), [profile.interests]);
  const activePracticeTopics = useMemo(() => practiceData[practiceLevel] || [], [practiceLevel]);
  const activePracticeTopic = selectedTopicIndex === null ? null : activePracticeTopics[selectedTopicIndex] || null;
  const activePracticeSet = activePracticeTopic?.sets[selectedSetIndex] || null;
  const totalQuestionsInSet = activePracticeSet?.questions.length || 0;
  const completedInSet = activePracticeSet?.questions.filter((item) => completedQuestions[item.id]).length || 0;
  const progressPercent = totalQuestionsInSet ? Math.round((completedInSet / totalQuestionsInSet) * 100) : 0;

  const filteredStudents = useMemo(() => {
    return studentsSeed
      .filter((student) => {
        const matchesLevel = selectedLevel === "All" || student.level === selectedLevel;
        const text = `${student.name} ${student.interests.join(" ")} ${student.goal} ${student.bio}`.toLowerCase();
        return matchesLevel && text.includes(search.toLowerCase());
      })
      .map((student) => ({
        ...student,
        shared: student.interests.filter((interest) => currentInterestList.includes(interest)),
      }));
  }, [selectedLevel, search, currentInterestList]);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesLevel = selectedLevel === "All" || group.level === selectedLevel;
      const text = `${group.name} ${group.topic}`.toLowerCase();
      return matchesLevel && text.includes(search.toLowerCase());
    });
  }, [groups, selectedLevel, search]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesLevel = selectedLevel === "All" || post.level === selectedLevel;
      const text = `${post.author} ${post.text} ${post.tags.join(" ")}`.toLowerCase();
      return matchesLevel && text.includes(search.toLowerCase());
    });
  }, [posts, selectedLevel, search]);

  const moderationSummary = useMemo(() => {
    return {
      openReports: reports.filter((item) => item.status === "open").length,
      removedPosts: groups.reduce(
        (count, group) => count + group.posts.filter((post) => post.status === "removed").length,
        0
      ),
    };
  }, [groups, reports]);

  const handleAuthSubmit = () => {
    if (!authForm.email.trim() || !authForm.password.trim()) {
      setAuthMessage("Please enter both email and password.");
      return;
    }

    const userProfile = {
      name: authForm.name.trim() || profile.name || "Student",
      level: profile.level,
      interests: profile.interests,
      goal: profile.goal,
      email: authForm.email.trim(),
    };

    if (bannedUsers.includes(userProfile.name)) {
      setAuthMessage("This account has been banned from Math Club.");
      return;
    }

    window.localStorage.setItem("math-peer-user", JSON.stringify(userProfile));
    setProfile((prev) => ({ ...prev, ...userProfile }));
    setIsLoggedIn(true);
    setAuthForm({ name: "", email: "", password: "" });
    setAuthMessage(loginMode === "login" ? "Logged in successfully." : "Account created successfully.");
    setActiveTab("groups");
  };

  const logout = () => {
    window.localStorage.removeItem("math-peer-user");
    setIsLoggedIn(false);
    setAuthMessage("You have logged out.");
  };

  const groupIdForStudent = (student) => {
    if (student.level === "Year 7") return 1;
    if (student.level === "Year 9") return 2;
    return 3;
  };

  const goToMathClub = () => {
    if (!isLoggedIn) {
      setAuthMessage("Please log in to access Math Club.");
      setActiveTab("login");
      return;
    }
    if (isCurrentUserBanned) {
      setAuthMessage("You cannot access Math Club because your account is banned.");
      setActiveTab("login");
      return;
    }
    setActiveTab("groups");
  };

  const joinGroup = (groupId) => {
    if (!isLoggedIn) {
      setAuthMessage("Please log in first to join Math Club.");
      setActiveTab("login");
      return;
    }
    if (isCurrentUserBanned) {
      setAuthMessage("You cannot join Math Club because your account is banned.");
      return;
    }
    if (joinedGroupIds.includes(groupId)) {
      setActiveGroupId(groupId);
      setActiveTab("groups");
      return;
    }
    setGroups((prev) => prev.map((group) => (group.id === groupId ? { ...group, members: group.members + 1 } : group)));
    setJoinedGroupIds((prev) => [...prev, groupId]);
    setActiveGroupId(groupId);
    setActiveTab("groups");
  };

  const addGroupPost = () => {
    if (!groupPostText.trim()) return;
    if (isCurrentUserMuted) {
      setAuthMessage("You are muted and cannot post in Math Club right now.");
      return;
    }
    if (isCurrentUserBanned) {
      setAuthMessage("You are banned and cannot post in Math Club.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      author: currentUserName,
      text: groupPostText,
      status: "active",
    };

    setGroups((prev) =>
      prev.map((group) =>
        group.id === activeGroupId ? { ...group, posts: [newEntry, ...group.posts] } : group
      )
    );
    setGroupPostText("");
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: posts.length + 1,
      author: isLoggedIn ? currentUserName : "Guest",
      level: selectedLevel === "All" ? profile.level : selectedLevel,
      text: newPost,
      tags: currentInterestList.length ? [currentInterestList[0]] : ["Study"],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const sender = isLoggedIn ? currentUserName : "Guest";
    setMessages([...messages, { id: messages.length + 1, from: sender, text: newMessage }]);
    setNewMessage("");
  };

  const toggleAnswer = (questionId) => setVisibleAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  const toggleCompleted = (questionId) => setCompletedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  const updateStudentAnswer = (questionId, value) => setStudentAnswers((prev) => ({ ...prev, [questionId]: value }));

  const checkAnswer = (question) => {
    const typed = (studentAnswers[question.id] || "").trim().toLowerCase();
    const expected = question.answer.trim().toLowerCase();
    const isCorrect = typed === expected;
    setCheckedAnswers((prev) => ({ ...prev, [question.id]: { attempted: true, isCorrect } }));
    if (isCorrect) setCompletedQuestions((prev) => ({ ...prev, [question.id]: true }));
  };

  const resetPracticeUi = () => {
    setVisibleAnswers({});
    setCheckedAnswers({});
  };

  const changePracticeLevel = (level) => {
    setPracticeLevel(level);
    setSelectedTopicIndex(null);
    setSelectedSetIndex(0);
    resetPracticeUi();
  };

  const openTopic = (index) => {
    setSelectedTopicIndex(index);
    setSelectedSetIndex(0);
    resetPracticeUi();
    setTimeout(() => {
      document.getElementById("practice-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const openGroupScreen = (groupId) => {
    setActiveGroupId(groupId);
    setActiveTab("groups");
    setTimeout(() => {
      document.getElementById("group-room-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const updateReportDraft = (postId, value) => {
    setReportDrafts((prev) => ({ ...prev, [postId]: value }));
  };

  const submitReport = (groupId, post) => {
    const reason = reportDrafts[post.id] || moderationReasons[0];
    const newReport = {
      id: Date.now(),
      groupId,
      postId: post.id,
      postAuthor: post.author,
      postText: post.text,
      reason,
      reportedBy: currentUserName,
      status: "open",
    };
    setReports((prev) => [newReport, ...prev]);
    setAuthMessage("Report submitted. Thank you for helping keep Math Club safe.");
  };

  const removeGroupPost = (groupId, postId) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              posts: group.posts.map((post) =>
                post.id === postId ? { ...post, status: "removed", text: "This post was removed by moderation." } : post
              ),
            }
          : group
      )
    );
  };

  const muteStudent = (name) => {
    if (!mutedUsers.includes(name)) {
      setMutedUsers((prev) => [...prev, name]);
    }
    setModerationNote(`${name} has been muted.`);
  };

  const banStudent = (name) => {
    if (!bannedUsers.includes(name)) {
      setBannedUsers((prev) => [...prev, name]);
    }
    setModerationNote(`${name} has been banned.`);
  };

  const closeReport = (reportId) => {
    setReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, status: "closed" } : report)));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={styles.heroTitle}>Math Peer Connect</div>
              <div style={styles.heroText}>Help students at the same level connect, share their interest in maths, join study groups, and support each other through practice and discussion.</div>
            </div>
            <div style={{ minWidth: "260px", textAlign: "right" }}>
              <div style={{ fontWeight: "700", marginBottom: "8px" }}>{isLoggedIn ? `Welcome, ${currentUserName}` : "Student login"}</div>
              <div style={{ color: "#475569", marginBottom: "10px" }}>
                {isCurrentUserBanned
                  ? "Your account is banned from Math Club."
                  : isCurrentUserMuted
                  ? "Your account is muted in Math Club."
                  : isLoggedIn
                  ? "You can now join Math Club and post updates."
                  : "Log in to join Math Club and make it active."}
              </div>
              {isLoggedIn ? <button style={styles.secondaryButton} onClick={logout}>Log out</button> : <button style={styles.button} onClick={() => setActiveTab("login")}>Open login</button>}
            </div>
          </div>
        </div>

        <div style={styles.layout}>
          <div>
            <div style={styles.sidebar}>
              <div style={styles.sectionTitle}>Filters</div>
              <input style={styles.input} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search interests or topics" />
              <div style={{ marginBottom: "12px", fontWeight: "600" }}>Math level</div>
              <div>{levels.map((level) => <button key={level} style={styles.pillButton(selectedLevel === level)} onClick={() => setSelectedLevel(level)}>{level}</button>)}</div>
            </div>

            <div style={{ ...styles.sidebar, marginTop: "20px" }}>
              <div style={styles.sectionTitle}>Your profile</div>
              <input style={styles.input} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Your name" />
              <input style={styles.input} value={profile.level} onChange={(e) => setProfile({ ...profile, level: e.target.value })} placeholder="Year level" />
              <input style={styles.input} value={profile.interests} onChange={(e) => setProfile({ ...profile, interests: e.target.value })} placeholder="Interests, separated by commas" />
              <textarea style={styles.textarea} value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })} placeholder="Your study goal" />
            </div>

            {isAdmin && (
              <div style={{ ...styles.sidebar, marginTop: "20px" }}>
                <div style={styles.sectionTitle}>Moderation Panel</div>
                <div style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
                  Open reports: {moderationSummary.openReports}
                </div>
                <div style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
                  Removed posts: {moderationSummary.removedPosts}
                </div>
                <div style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
                  Muted users: {mutedUsers.length}
                </div>
                <div style={{ fontSize: "14px", color: "#475569", marginBottom: "12px" }}>
                  Banned users: {bannedUsers.length}
                </div>
                {moderationNote && (
                  <div style={{ padding: "10px 12px", borderRadius: "12px", background: "#fef3c7", fontSize: "14px" }}>
                    {moderationNote}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <div style={styles.tabs}>
              <button style={styles.tabButton(activeTab === "students")} onClick={() => setActiveTab("students")}>Students</button>
              <button style={styles.tabButton(activeTab === "groups")} onClick={() => {
                if (!isLoggedIn) {
                  setAuthMessage("Please log in to access Math Club.");
                  setActiveTab("login");
                } else if (isCurrentUserBanned) {
                  setAuthMessage("You cannot access Math Club because your account is banned.");
                  setActiveTab("login");
                } else {
                  setActiveTab("groups");
                }
              }}>Math Club</button>
              <button style={styles.tabButton(activeTab === "feed")} onClick={() => setActiveTab("feed")}>Feed</button>
              <button style={styles.tabButton(activeTab === "practice")} onClick={() => setActiveTab("practice")}>Free Practice</button>
              <button style={styles.tabButton(activeTab === "chat")} onClick={() => setActiveTab("chat")}>Chat</button>
              <button style={styles.tabButton(activeTab === "login")} onClick={() => setActiveTab("login")}>Login</button>
            </div>

            {activeTab === "students" && (
              <div style={{ display: "grid", gap: "16px" }}>
                <div style={styles.card}>
                  <h3>Student Profile</h3>
                  <p style={{ color: "#475569" }}>
                    This area is private to the student. It shows learning progress, joined activities, and attendance instead of other students' names.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "12px" }}>
                    <div style={{ padding: "14px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "14px", color: "#475569" }}>Student</div>
                      <div style={{ fontSize: "20px", fontWeight: "700", marginTop: "4px" }}>{currentUserName}</div>
                      <div style={{ marginTop: "8px" }}><span style={styles.badge}>{profile.level}</span></div>
                    </div>
                    <div style={{ padding: "14px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "14px", color: "#475569" }}>Activities joined</div>
                      <div style={{ fontSize: "20px", fontWeight: "700", marginTop: "4px" }}>{joinedGroupIds.length}</div>
                      <div style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>Math Club rooms and practice activities</div>
                    </div>
                    <div style={{ padding: "14px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "14px", color: "#475569" }}>Attendance</div>
                      <div style={{ fontSize: "20px", fontWeight: "700", marginTop: "4px" }}>{joinedGroupIds.length > 0 ? "Good" : "Not started"}</div>
                      <div style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>{joinedGroupIds.length > 0 ? `${joinedGroupIds.length} club activities joined` : "Join a Math Club room to begin"}</div>
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <h3>Progress Chart</h3>
                  <p style={{ color: "#475569", marginBottom: "12px" }}>
                    Current practice progress for the selected activity.
                  </p>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                        <span>Practice completion</span>
                        <strong>{progressPercent}%</strong>
                      </div>
                      <div style={styles.progressBarOuter}>
                        <div style={{ width: `${progressPercent}%`, height: "100%", background: "#0f172a" }} />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                        <span>Questions completed</span>
                        <strong>{completedInSet}/{totalQuestionsInSet || 0}</strong>
                      </div>
                      <div style={styles.progressBarOuter}>
                        <div style={{ width: `${totalQuestionsInSet ? Math.round((completedInSet / totalQuestionsInSet) * 100) : 0}%`, height: "100%", background: "#334155" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <h3>Joined Activities</h3>
                  {joinedGroupIds.length === 0 ? (
                    <p style={{ color: "#475569" }}>No activities joined yet. Join Math Club or start a practice topic.</p>
                  ) : (
                    <div style={{ display: "grid", gap: "10px" }}>
                      {groups.filter((group) => joinedGroupIds.includes(group.id)).map((group) => (
                        <div key={group.id} style={{ padding: "12px 14px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
                            <strong>{group.name}</strong>
                            <span style={styles.badge}>{group.meeting}</span>
                          </div>
                          <div style={{ color: "#475569", marginTop: "6px" }}>{group.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.card}>
                  <h3>Activity Attendance</h3>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {(joinedGroupIds.length === 0 ? [{ id: "none", name: "No attendance yet", meeting: "Join a room to begin", status: "Pending" }] : groups.filter((group) => joinedGroupIds.includes(group.id)).map((group) => ({ id: group.id, name: group.name, meeting: group.meeting, status: "Joined" }))).map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", padding: "12px 14px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontWeight: "700" }}>{item.name}</div>
                          <div style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>{item.meeting}</div>
                        </div>
                        <span style={styles.badge}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "groups" && !isLoggedIn && (
              <div style={styles.card}>
                <h3>🔒 Math Club (Members Only)</h3>
                <p style={{ color: "#475569" }}>Join Math Club to access group discussions, guided support, and weekly challenges.</p>
                <button style={styles.button} onClick={() => setActiveTab("login")}>Log in to continue</button>
              </div>
            )}

            {activeTab === "groups" && isLoggedIn && !isCurrentUserBanned && (
              <div>
                <div style={styles.cardGrid}>
                  {filteredGroups.map((group) => (
                    <div key={group.id} style={styles.card}>
                      <h3>{group.name}</h3>
                      <p><strong>{group.level}</strong></p>
                      <p><strong>Topic:</strong> {group.topic}</p>
                      <p>{group.description}</p>
                      <p><strong>Members:</strong> {group.members}</p>
                      <p><strong>Next meeting:</strong> {group.meeting}</p>
                      <button style={styles.secondaryButton} onClick={() => joinGroup(group.id)}>
                        {joinedGroupIds.includes(group.id) ? "Joined" : "Join group"}
                      </button>
                      <button style={{ ...styles.button, marginLeft: "8px" }} onClick={() => openGroupScreen(group.id)}>Open group</button>
                    </div>
                  ))}
                </div>

                <div id="group-room-section" style={{ ...styles.card, marginTop: "20px", minHeight: "70vh" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0 }}>{activeGroup.name}</h3>
                    <span style={{ ...styles.badge, margin: 0 }}>Group Room</span>
                  </div>
                  <p><strong>Active room:</strong> {activeGroup.topic} · {activeGroup.meeting}</p>
                  <p>{activeGroup.description}</p>
                  <div style={{ padding: "12px 14px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: "12px", fontSize: "14px" }}>
                    Be respectful. This is a learning space. Bullying, harmful content, and spam may lead to mute or ban.
                  </div>
                  <textarea
                    style={styles.textarea}
                    value={groupPostText}
                    onChange={(e) => setGroupPostText(e.target.value)}
                    placeholder={isCurrentUserMuted ? "You are muted and cannot post right now" : "Write an update for the group"}
                    disabled={isCurrentUserMuted}
                  />
                  <button style={styles.button} onClick={addGroupPost} disabled={isCurrentUserMuted}>Post to group</button>
                  <div style={{ marginTop: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "12px", minHeight: "320px" }}>
                    {activeGroup.posts.map((post) => (
                      <div key={post.id} style={{ padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "start", flexWrap: "wrap" }}>
                          <div>
                            <div style={{ fontWeight: "700" }}>{post.author}</div>
                            <div style={{ marginTop: "6px", color: post.status === "removed" ? "#9ca3af" : "#0f172a" }}>
                              {post.text}
                            </div>
                          </div>
                          {post.status !== "removed" && (
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              <select
                                value={reportDrafts[post.id] || moderationReasons[0]}
                                onChange={(e) => updateReportDraft(post.id, e.target.value)}
                                style={{ padding: "8px 10px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
                              >
                                {moderationReasons.map((reason) => (
                                  <option key={reason} value={reason}>{reason}</option>
                                ))}
                              </select>
                              <button style={styles.dangerButton} onClick={() => submitReport(activeGroup.id, post)}>
                                Report
                              </button>
                              {isAdmin && (
                                <>
                                  <button style={styles.secondaryButton} onClick={() => removeGroupPost(activeGroup.id, post.id)}>Delete</button>
                                  <button style={styles.secondaryButton} onClick={() => muteStudent(post.author)}>Mute</button>
                                  <button style={styles.dangerButton} onClick={() => banStudent(post.author)}>Ban</button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {isAdmin && (
                  <div style={{ ...styles.card, marginTop: "20px" }}>
                    <h3>Reports Queue</h3>
                    {reports.length === 0 ? (
                      <p style={{ color: "#475569" }}>No reports yet.</p>
                    ) : (
                      reports.map((report) => (
                        <div key={report.id} style={{ padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
                          <div><strong>Reason:</strong> {report.reason}</div>
                          <div><strong>Reported by:</strong> {report.reportedBy}</div>
                          <div><strong>Post author:</strong> {report.postAuthor}</div>
                          <div style={{ color: "#475569", marginTop: "6px" }}>{report.postText}</div>
                          <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            <span style={styles.badge}>Status: {report.status}</span>
                            {report.status === "open" && (
                              <button style={styles.secondaryButton} onClick={() => closeReport(report.id)}>Close report</button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "feed" && (
              <div>
                <div style={styles.card}>
                  <h3>Share a math post</h3>
                  <textarea style={styles.textarea} value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Ask a question or invite students to study" />
                  <button style={styles.button} onClick={addPost}>Post</button>
                </div>
                <div style={{ marginTop: "16px" }}>
                  {filteredPosts.map((post) => (
                    <div key={post.id} style={{ ...styles.card, marginBottom: "16px" }}>
                      <h3>{post.author}</h3>
                      <p><strong>{post.level}</strong></p>
                      <p>{post.text}</p>
                      <div>{post.tags.map((tag) => <span key={tag} style={styles.badge}>#{tag}</span>)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "practice" && (
              <div>
                <div style={styles.card}>
                  <h3>Free Math Practice</h3>
                  <p style={{ color: "#475569" }}>Choose your year level and click a topic to start. Problems appear only after you open a topic.</p>
                  <div style={{ marginTop: "12px", marginBottom: "16px" }}>
                    {practiceLevels.map((level) => <button key={level} style={styles.pillButton(practiceLevel === level)} onClick={() => changePracticeLevel(level)}>{level}</button>)}
                  </div>
                  <div style={styles.cardGrid}>
                    {activePracticeTopics.map((topic, index) => (
                      <div key={topic.topic} style={styles.card}>
                        <h3>{topic.topic}</h3>
                        <p>{topic.sets.length} practice set{topic.sets.length > 1 ? "s" : ""}</p>
                        <button style={styles.button} onClick={() => openTopic(index)}>Open topic</button>
                      </div>
                    ))}
                  </div>
                </div>

                {activePracticeTopic && activePracticeSet && (
                  <div id="practice-section" style={{ ...styles.card, marginTop: "20px" }}>
                    <h3>{practiceLevel} · {activePracticeTopic.topic}</h3>
                    <p><strong>{activePracticeSet.title}</strong></p>
                    <div style={{ marginTop: "16px", padding: "16px", borderRadius: "16px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontWeight: "700" }}>Your progress</div>
                          <div style={{ color: "#475569" }}>{completedInSet} of {totalQuestionsInSet} questions completed</div>
                        </div>
                        <div style={{ fontWeight: "700" }}>{progressPercent}%</div>
                      </div>
                      <div style={styles.progressBarOuter}><div style={{ width: `${progressPercent}%`, height: "100%", background: "#0f172a" }} /></div>
                    </div>

                    <div style={{ marginTop: "10px", marginBottom: "16px" }}>
                      {activePracticeTopic.sets.map((setItem, index) => (
                        <button key={setItem.title} style={styles.pillButton(selectedSetIndex === index)} onClick={() => {
                          setSelectedSetIndex(index);
                          resetPracticeUi();
                        }}>{setItem.title}</button>
                      ))}
                    </div>

                    {activePracticeSet.questions.map((item) => (
                      <div key={item.id} style={styles.questionCard}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                          <div style={{ fontWeight: "700", marginBottom: "8px" }}>Question</div>
                          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                            <input type="checkbox" checked={!!completedQuestions[item.id]} onChange={() => toggleCompleted(item.id)} />
                            Mark complete
                          </label>
                        </div>
                        <div style={{ marginBottom: "10px" }}>{item.question}</div>
                        <input style={styles.input} value={studentAnswers[item.id] || ""} onChange={(e) => updateStudentAnswer(item.id, e.target.value)} placeholder="Type your answer here" />
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button style={styles.button} onClick={() => checkAnswer(item)}>Check answer</button>
                          <button style={styles.secondaryButton} onClick={() => toggleAnswer(item.id)}>{visibleAnswers[item.id] ? "Hide answer" : "Show answer"}</button>
                        </div>
                        {checkedAnswers[item.id]?.attempted && (
                          <div style={{ marginTop: "12px", padding: "10px 12px", borderRadius: "12px", background: checkedAnswers[item.id].isCorrect ? "#dcfce7" : "#fee2e2" }}>
                            {checkedAnswers[item.id].isCorrect ? "Correct — well done!" : "Not quite yet — check the explanation or try again."}
                          </div>
                        )}
                        {visibleAnswers[item.id] && (
                          <div style={{ marginTop: "12px" }}>
                            <div><strong>Answer:</strong> {item.answer}</div>
                            <div style={{ color: "#475569", marginTop: "6px" }}><strong>How to solve:</strong> {item.explanation}</div>
                            <div style={{ color: "#475569", marginTop: "6px" }}><strong>Common mistake:</strong> {item.commonMistake}</div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div style={{ marginTop: "20px", padding: "16px", borderRadius: "16px", background: "#e0f2fe" }}>
                      <div style={{ fontWeight: "700", marginBottom: "8px" }}>Want a personalised study plan?</div>
                      <div style={{ color: "#0f172a", marginBottom: "8px" }}>Join the student portal to get guided practice, extra materials, support tailored to your level, answer checking, and a clearer picture of your progress.</div>
                      <div style={{ color: "#0f172a" }}>You will also get step-by-step feedback and a progress chart to help you improve faster.</div>
                      <button style={styles.button} onClick={() => setActiveTab("login")}>Get personalised help</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "chat" && (
              <div style={styles.chatBox}>
                <h3>Private chat demo</h3>
                <div style={{ marginBottom: "16px", marginTop: "16px" }}>
                  {messages.map((message) => (
                    <div key={message.id} style={styles.message(message.from === "You" || message.from === currentUserName)}>
                      <div style={{ fontSize: "12px", marginBottom: "4px", opacity: 0.8 }}>{message.from}</div>
                      <div>{message.text}</div>
                    </div>
                  ))}
                </div>
                <input style={styles.input} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={isLoggedIn ? "Type a message" : "Type a guest message"} />
                <button style={styles.button} onClick={sendMessage}>Send</button>
              </div>
            )}

            {activeTab === "login" && (
              <div style={styles.card}>
                <h3>{loginMode === "login" ? "Student login" : "Create account"}</h3>
                <p style={{ color: "#475569" }}>This version uses simple local login so you can test the app before adding Firebase.</p>
                {authMessage && (
                  <div style={{ marginBottom: "12px", padding: "10px 12px", borderRadius: "12px", background: "#e0f2fe", color: "#0f172a" }}>
                    {authMessage}
                  </div>
                )}
                {loginMode === "signup" && (
                  <input style={styles.input} value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} placeholder="Your name" />
                )}
                <input style={styles.input} value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} placeholder="Email" />
                <input style={styles.input} type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} placeholder="Password" />
                <button style={styles.button} onClick={handleAuthSubmit}>{loginMode === "login" ? "Log in" : "Create account"}</button>
                <button style={{ ...styles.secondaryButton, marginLeft: "8px" }} onClick={() => {
                  setLoginMode(loginMode === "login" ? "signup" : "login");
                  setAuthMessage("");
                }}>Switch to {loginMode === "login" ? "sign up" : "login"}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}