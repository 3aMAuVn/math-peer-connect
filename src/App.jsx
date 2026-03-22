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
    description: "A friendly group for puzzle lovers who enjoy short challenge questions.",
    posts: ["Welcome to Puzzle Club!", "Bring one favourite puzzle to share this week."],
  },
  {
    id: 2,
    name: "Year 9 Algebra Circle",
    level: "Year 9",
    topic: "Algebra",
    members: 8,
    meeting: "Wednesday 4:30 PM",
    description: "Work through algebra skills together and prepare for tests.",
    posts: ["This week: simplifying expressions.", "Post one tricky algebra question below."],
  },
  {
    id: 3,
    name: "Year 11 Calculus Crew",
    level: "Year 11",
    topic: "Calculus",
    members: 10,
    meeting: "Friday 5:00 PM",
    description: "Practice derivatives and exam-style questions as a team.",
    posts: ["Friday focus: derivative rules.", "Share one exam tip before the session."],
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
              explanation: "Convert to quarters: 1/2 = 2/4, then 2/4 + 1/4 = 3/4.",
            },
            {
              id: 2,
              question: "3/5 - 1/5 = ?",
              answer: "2/5",
              explanation: "The denominator stays 5, so subtract only the numerators.",
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
              explanation: "Compare decimals: 2/3 ≈ 0.667 and 3/5 = 0.6.",
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
            },
            {
              id: 5,
              question: "1.2 - 0.8 = ?",
              answer: "0.4",
              explanation: "Subtract tenths carefully: 12 tenths - 8 tenths = 4 tenths.",
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
              explanation: "Combine like terms by adding the coefficients.",
            },
            {
              id: 7,
              question: "Solve: x + 4 = 11",
              answer: "x = 7",
              explanation: "Subtract 4 from both sides.",
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
              explanation: "The interior angles of any triangle always add to 180°.",
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
              explanation: "Use the power rule: d/dx(x^n) = nx^(n-1).",
            },
            {
              id: 10,
              question: "Differentiate: 5x^3",
              answer: "15x^2",
              explanation: "Multiply by the power, then reduce the exponent by 1.",
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

const levels = ["All", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"];
const practiceLevels = ["Year 7", "Year 9", "Year 11"];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  hero: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    marginBottom: "24px",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  heroText: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: 1.6,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "24px",
  },
  sidebar: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    height: "fit-content",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    marginBottom: "12px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    marginBottom: "12px",
    minHeight: "90px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  tabButton: (active) => ({
    padding: "10px 16px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: active ? "#0f172a" : "#e2e8f0",
    color: active ? "#ffffff" : "#0f172a",
    fontWeight: "600",
  }),
  levelButton: (active) => ({
    padding: "8px 12px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    margin: "4px",
    background: active ? "#0f172a" : "#e2e8f0",
    color: active ? "#ffffff" : "#0f172a",
  }),
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#e2e8f0",
    marginRight: "8px",
    marginBottom: "8px",
    fontSize: "12px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: "600",
    marginTop: "12px",
  },
  secondaryButton: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    cursor: "pointer",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: "600",
    marginTop: "12px",
  },
  chatBox: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  message: (isYou) => ({
    maxWidth: "75%",
    marginLeft: isYou ? "auto" : "0",
    background: isYou ? "#0f172a" : "#f1f5f9",
    color: isYou ? "#ffffff" : "#0f172a",
    padding: "12px 14px",
    borderRadius: "14px",
    marginBottom: "10px",
  }),
  questionCard: {
    padding: "14px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    marginBottom: "12px",
  },
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMode, setLoginMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [profile, setProfile] = useState({
    name: "You",
    level: "Year 9",
    interests: "Geometry, Algebra",
    goal: "Find two students to study with every week.",
  });
  const [practiceLevel, setPracticeLevel] = useState("Year 7");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [visibleAnswers, setVisibleAnswers] = useState({});

  useEffect(() => {
    const savedUser = window.localStorage.getItem("math-peer-user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setProfile((prev) => ({ ...prev, ...parsedUser }));
      setIsLoggedIn(true);
    }
  }, []);

  const activeGroup = useMemo(() => {
    return groups.find((group) => group.id === activeGroupId) || groups[0];
  }, [groups, activeGroupId]);

  const currentInterestList = useMemo(() => {
    return profile.interests
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [profile.interests]);

  const activePracticeTopics = useMemo(() => practiceData[practiceLevel] || [], [practiceLevel]);
  const activePracticeTopic = activePracticeTopics[selectedTopicIndex] || activePracticeTopics[0] || null;
  const activePracticeSet = activePracticeTopic?.sets[selectedSetIndex] || activePracticeTopic?.sets[0] || null;

  const filteredStudents = useMemo(() => {
    return studentsSeed
      .filter((student) => {
        const matchesLevel = selectedLevel === "All" || student.level === selectedLevel;
        const text = `${student.name} ${student.interests.join(" ")} ${student.goal} ${student.bio}`.toLowerCase();
        const matchesSearch = text.includes(search.toLowerCase());
        return matchesLevel && matchesSearch;
      })
      .map((student) => {
        const shared = student.interests.filter((interest) => currentInterestList.includes(interest));
        return { ...student, shared };
      });
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

  const joinGroup = (groupId) => {
    if (!isLoggedIn) {
      setAuthMessage("Please log in first to join a group.");
      setActiveTab("login");
      return;
    }

    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, members: group.members + 1 } : group
      )
    );
    setActiveGroupId(groupId);
    setActiveTab("groups");
  };

  const addGroupPost = () => {
    if (!groupPostText.trim()) return;
    setGroups((prev) =>
      prev.map((group) =>
        group.id === activeGroupId
          ? {
              ...group,
              posts: [`${profile.name}: ${groupPostText}`, ...group.posts],
            }
          : group
      )
    );
    setGroupPostText("");
  };

  const addPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: isLoggedIn ? profile.name : "Guest",
      level: selectedLevel === "All" ? profile.level : selectedLevel,
      text: newPost,
      tags: currentInterestList.length ? [currentInterestList[0]] : ["Study"],
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const sender = isLoggedIn ? profile.name : "Guest";
    setMessages([...messages, { id: messages.length + 1, from: sender, text: newMessage }]);
    setNewMessage("");
  };

  const toggleAnswer = (questionId) => {
    setVisibleAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const changePracticeLevel = (level) => {
    setPracticeLevel(level);
    setSelectedTopicIndex(0);
    setSelectedSetIndex(0);
    setVisibleAnswers({});
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={styles.heroTitle}>Math Peer Connect</div>
              <div style={styles.heroText}>
                Help students at the same level connect, share their interest in maths, join study groups,
                and support each other through practice and discussion.
              </div>
            </div>
            <div style={{ minWidth: "220px", textAlign: "right" }}>
              <div style={{ fontWeight: "700", marginBottom: "8px" }}>
                {isLoggedIn ? `Welcome, ${profile.name}` : "Student login"}
              </div>
              <div style={{ color: "#475569", marginBottom: "10px" }}>
                {isLoggedIn ? "You can now join groups and post updates." : "Log in to join groups and make them active."}
              </div>
              {isLoggedIn ? (
                <button style={styles.secondaryButton} onClick={logout}>Log out</button>
              ) : (
                <button style={styles.button} onClick={() => setActiveTab("login")}>Open login</button>
              )}
            </div>
          </div>
        </div>

        <div style={styles.layout}>
          <div>
            <div style={styles.sidebar}>
              <div style={styles.sectionTitle}>Filters</div>
              <input
                style={styles.input}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search interests or topics"
              />

              <div style={{ marginBottom: "12px", fontWeight: "600" }}>Math level</div>
              <div>
                {levels.map((level) => (
                  <button
                    key={level}
                    style={styles.levelButton(selectedLevel === level)}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ ...styles.sidebar, marginTop: "20px" }}>
              <div style={styles.sectionTitle}>Your profile</div>
              <input
                style={styles.input}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Your name"
              />
              <input
                style={styles.input}
                value={profile.level}
                onChange={(e) => setProfile({ ...profile, level: e.target.value })}
                placeholder="Year level"
              />
              <input
                style={styles.input}
                value={profile.interests}
                onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                placeholder="Interests, separated by commas"
              />
              <textarea
                style={styles.textarea}
                value={profile.goal}
                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                placeholder="Your study goal"
              />
            </div>
          </div>

          <div>
            <div style={styles.tabs}>
              <button style={styles.tabButton(activeTab === "students")} onClick={() => setActiveTab("students")}>Students</button>
              <button style={styles.tabButton(activeTab === "groups")} onClick={() => setActiveTab("groups")}>Groups</button>
              <button style={styles.tabButton(activeTab === "feed")} onClick={() => setActiveTab("feed")}>Feed</button>
              <button style={styles.tabButton(activeTab === "practice")} onClick={() => setActiveTab("practice")}>Free Practice</button>
              <button style={styles.tabButton(activeTab === "chat")} onClick={() => setActiveTab("chat")}>Chat</button>
              <button style={styles.tabButton(activeTab === "login")} onClick={() => setActiveTab("login")}>Login</button>
            </div>

            {activeTab === "students" && (
              <div style={styles.cardGrid}>
                {filteredStudents.map((student) => (
                  <div key={student.id} style={styles.card}>
                    <h3>{student.name}</h3>
                    <p><strong>{student.level}</strong></p>
                    <p>{student.goal}</p>
                    <p>{student.bio}</p>
                    <p><strong>Available:</strong> {student.availability}</p>
                    <div style={{ marginTop: "10px" }}>
                      {student.interests.map((interest) => (
                        <span key={interest} style={styles.badge}>{interest}</span>
                      ))}
                    </div>
                    {student.shared.length > 0 && (
                      <p><strong>Shared interests:</strong> {student.shared.join(", ")}</p>
                    )}
                    <button style={styles.button} onClick={() => joinGroup(groupIdForStudent(student))}>Connect</button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "groups" && (
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
                      <button style={styles.secondaryButton} onClick={() => joinGroup(group.id)}>Join group</button>
                      <button style={{ ...styles.button, marginLeft: "8px" }} onClick={() => setActiveGroupId(group.id)}>Open group</button>
                    </div>
                  ))}
                </div>

                <div style={{ ...styles.card, marginTop: "20px" }}>
                  <h3>{activeGroup.name}</h3>
                  <p><strong>Active room:</strong> {activeGroup.topic} · {activeGroup.meeting}</p>
                  <p>{activeGroup.description}</p>
                  <textarea
                    style={styles.textarea}
                    value={groupPostText}
                    onChange={(e) => setGroupPostText(e.target.value)}
                    placeholder={isLoggedIn ? "Write an update for the group" : "Log in to post in the group"}
                    disabled={!isLoggedIn}
                  />
                  <button style={styles.button} onClick={addGroupPost} disabled={!isLoggedIn}>Post to group</button>
                  <div style={{ marginTop: "16px" }}>
                    {activeGroup.posts.map((post, index) => (
                      <div key={index} style={{ padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
                        {post}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "feed" && (
              <div>
                <div style={styles.card}>
                  <h3>Share a math post</h3>
                  <textarea
                    style={styles.textarea}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Ask a question or invite students to study"
                  />
                  <button style={styles.button} onClick={addPost}>Post</button>
                </div>

                <div style={{ marginTop: "16px" }}>
                  {filteredPosts.map((post) => (
                    <div key={post.id} style={{ ...styles.card, marginBottom: "16px" }}>
                      <h3>{post.author}</h3>
                      <p><strong>{post.level}</strong></p>
                      <p>{post.text}</p>
                      <div>
                        {post.tags.map((tag) => (
                          <span key={tag} style={styles.badge}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "practice" && (
              <div>
                <div style={styles.card}>
                  <h3>Free Math Practice</h3>
                  <p style={{ color: "#475569" }}>
                    Choose your year level, pick a topic, and practise with guided answers and explanations.
                  </p>
                  <div style={{ marginTop: "12px", marginBottom: "16px" }}>
                    {practiceLevels.map((level) => (
                      <button
                        key={level}
                        style={styles.levelButton(practiceLevel === level)}
                        onClick={() => changePracticeLevel(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <div style={styles.cardGrid}>
                    {activePracticeTopics.map((topic, index) => (
                      <div key={topic.topic} style={styles.card}>
                        <h3>{topic.topic}</h3>
                        <p>{topic.sets.length} practice set{topic.sets.length > 1 ? "s" : ""}</p>
                        <button
                          style={styles.button}
                          onClick={() => {
                            setSelectedTopicIndex(index);
                            setSelectedSetIndex(0);
                            setVisibleAnswers({});
                          }}
                        >
                          Open topic
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {activePracticeTopic && activePracticeSet && (
                  <div style={{ ...styles.card, marginTop: "20px" }}>
                    <h3>{practiceLevel} · {activePracticeTopic.topic}</h3>
                    <p><strong>{activePracticeSet.title}</strong></p>
                    <div style={{ marginTop: "10px", marginBottom: "16px" }}>
                      {activePracticeTopic.sets.map((setItem, index) => (
                        <button
                          key={setItem.title}
                          style={styles.levelButton(selectedSetIndex === index)}
                          onClick={() => {
                            setSelectedSetIndex(index);
                            setVisibleAnswers({});
                          }}
                        >
                          {setItem.title}
                        </button>
                      ))}
                    </div>

                    {activePracticeSet.questions.map((item) => (
                      <div key={item.id} style={styles.questionCard}>
                        <div style={{ fontWeight: "700", marginBottom: "8px" }}>Question</div>
                        <div style={{ marginBottom: "10px" }}>{item.question}</div>
                        <button style={styles.secondaryButton} onClick={() => toggleAnswer(item.id)}>
                          {visibleAnswers[item.id] ? "Hide answer" : "Show answer"}
                        </button>
                        {visibleAnswers[item.id] && (
                          <div style={{ marginTop: "12px" }}>
                            <div><strong>Answer:</strong> {item.answer}</div>
                            <div style={{ color: "#475569", marginTop: "6px" }}><strong>How to solve:</strong> {item.explanation}</div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div style={{ marginTop: "20px", padding: "16px", borderRadius: "16px", background: "#e0f2fe" }}>
                      <div style={{ fontWeight: "700", marginBottom: "8px" }}>Want a personalised study plan?</div>
                      <div style={{ color: "#0f172a" }}>
                        Join the student portal to get guided practice, extra materials, and support tailored to your level.
                      </div>
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
                    <div key={message.id} style={styles.message(message.from === "You" || message.from === profile.name)}>
                      <div style={{ fontSize: "12px", marginBottom: "4px", opacity: 0.8 }}>{message.from}</div>
                      <div>{message.text}</div>
                    </div>
                  ))}
                </div>
                <input
                  style={styles.input}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isLoggedIn ? "Type a message" : "Type a guest message"}
                />
                <button style={styles.button} onClick={sendMessage}>Send</button>
              </div>
            )}

            {activeTab === "login" && (
              <div style={styles.card}>
                <h3>{loginMode === "login" ? "Student login" : "Create account"}</h3>
                <p style={{ color: "#475569" }}>
                  This version uses simple local login so you can test the app before adding Firebase.
                </p>
                {authMessage && (
                  <div style={{ marginBottom: "12px", padding: "10px 12px", borderRadius: "12px", background: "#e0f2fe", color: "#0f172a" }}>
                    {authMessage}
                  </div>
                )}
                {loginMode === "signup" && (
                  <input
                    style={styles.input}
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    placeholder="Your name"
                  />
                )}
                <input
                  style={styles.input}
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  style={styles.input}
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  placeholder="Password"
                />
                <button style={styles.button} onClick={handleAuthSubmit}>
                  {loginMode === "login" ? "Log in" : "Create account"}
                </button>
                <button
                  style={{ ...styles.secondaryButton, marginLeft: "8px" }}
                  onClick={() => {
                    setLoginMode(loginMode === "login" ? "signup" : "login");
                    setAuthMessage("");
                  }}
                >
                  Switch to {loginMode === "login" ? "sign up" : "login"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}