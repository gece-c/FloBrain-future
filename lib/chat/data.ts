import { directRoomId } from "@/lib/chat/access";
import type { ChatMessage, ChatRoom } from "@/lib/chat/types";

type Person = { id: string; name: string };

const john: Person = { id: "u-john-h", name: "John H." };
const mohamed: Person = { id: "u-mohamed-a", name: "Mohamed A." };
const ceren: Person = { id: "u-ceren-g", name: "Ceren G." };
const diogo: Person = { id: "u-diogo-s", name: "Diogo S." };
const claudia: Person = { id: "u-claudia-l", name: "Claudia L." };
const serina: Person = { id: "u-serina-z", name: "Serina Z." };
const rebecca: Person = { id: "u-rebecca-a", name: "Rebecca A." };
const kendra: Person = { id: "u-kendra-l", name: "Kendra L." };

function slugify(name: string) {
  return name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
}

function dm(
  a: Person,
  b: Person,
  messages: Array<{ id: string; author: Person; content: string; createdAt: string }>,
): ChatRoom {
  return {
    id: directRoomId(a.id, b.id),
    kind: "direct",
    name: b.name,
    slug: slugify(b.name),
    memberIds: [a.id, b.id],
    messages: messages.map(
      (entry): ChatMessage => ({
        id: entry.id,
        authorId: entry.author.id,
        authorName: entry.author.name,
        content: entry.content,
        createdAt: entry.createdAt,
      }),
    ),
  };
}

const channelRooms: ChatRoom[] = [
  {
    id: "all-general",
    kind: "all",
    name: "General",
    slug: "general",
    memberIds: [],
    messages: [
      {
        id: "m-g1",
        authorId: ceren.id,
        authorName: ceren.name,
        content: "Morning everyone, standup notes are in the workspace doc.",
        createdAt: "2026-06-16T08:30:00.000Z",
      },
      {
        id: "m-g2",
        authorId: diogo.id,
        authorName: diogo.name,
        content: "Thanks! I'll pick up the onboarding card feedback today.",
        createdAt: "2026-06-16T08:42:00.000Z",
      },
    ],
  },
  {
    id: "all-announcements",
    kind: "all",
    name: "Announcements",
    slug: "announcements",
    memberIds: [],
    messages: [
      {
        id: "m-a1",
        authorId: mohamed.id,
        authorName: mohamed.name,
        content: "Q2 planning review is scheduled for Thursday at 14:00.",
        createdAt: "2026-06-15T10:00:00.000Z",
      },
    ],
  },
  {
    id: "all-random",
    kind: "all",
    name: "Random",
    slug: "random",
    memberIds: [],
    messages: [
      {
        id: "m-r1",
        authorId: kendra.id,
        authorName: kendra.name,
        content: "Anyone tried the new design buddy workspace yet?",
        createdAt: "2026-06-16T09:10:00.000Z",
      },
    ],
  },
  {
    id: "team-growth",
    kind: "team",
    name: "Growth",
    slug: "growth",
    teamName: "Growth",
    memberIds: [],
    messages: [
      {
        id: "m-tg1",
        authorId: kendra.id,
        authorName: kendra.name,
        content: "Campaign brief draft is ready for review.",
        createdAt: "2026-06-16T07:55:00.000Z",
      },
    ],
  },
  {
    id: "team-design",
    kind: "team",
    name: "Design",
    slug: "design",
    teamName: "Design",
    memberIds: [],
    messages: [
      {
        id: "m-td1",
        authorId: rebecca.id,
        authorName: rebecca.name,
        content: "Updated Figma links for the onboarding flow.",
        createdAt: "2026-06-16T08:05:00.000Z",
      },
      {
        id: "m-td2",
        authorId: diogo.id,
        authorName: diogo.name,
        content: "Looks great, spacing on the hero feels much tighter now.",
        createdAt: "2026-06-16T08:18:00.000Z",
      },
    ],
  },
  {
    id: "team-management",
    kind: "team",
    name: "Management",
    slug: "management",
    teamName: "Management",
    memberIds: [],
    messages: [
      {
        id: "m-tm1",
        authorId: mohamed.id,
        authorName: mohamed.name,
        content: "Leadership sync notes posted to FloVault.",
        createdAt: "2026-06-15T16:20:00.000Z",
      },
    ],
  },
  {
    id: "team-executive",
    kind: "team",
    name: "Executive",
    slug: "executive",
    teamName: "Executive",
    memberIds: [],
    messages: [
      {
        id: "m-te1",
        authorId: john.id,
        authorName: john.name,
        content: "Board prep deck is in final review.",
        createdAt: "2026-06-15T11:30:00.000Z",
      },
    ],
  },
  {
    id: "group-launch-squad",
    kind: "group",
    name: "Launch Squad",
    slug: "launch-squad",
    memberIds: [ceren.id, diogo.id, rebecca.id],
    messages: [
      {
        id: "m-ls1",
        authorId: ceren.id,
        authorName: ceren.name,
        content: "Let's lock the launch checklist by EOD.",
        createdAt: "2026-06-16T09:00:00.000Z",
      },
    ],
  },
  {
    id: "group-finance-sync",
    kind: "group",
    name: "Finance Sync",
    slug: "finance-sync",
    memberIds: [john.id, mohamed.id, ceren.id],
    messages: [
      {
        id: "m-fs1",
        authorId: mohamed.id,
        authorName: mohamed.name,
        content: "Invoice approvals are queued for tier 2 members.",
        createdAt: "2026-06-14T14:00:00.000Z",
      },
    ],
  },
];

const directRooms: ChatRoom[] = [
  dm(ceren, diogo, [
    {
      id: "m-cd1",
      author: ceren,
      content: "Can you share the latest card specs before standup?",
      createdAt: "2026-06-16T07:40:00.000Z",
    },
    {
      id: "m-cd2",
      author: diogo,
      content: "Sure, uploading to FloVault in a few minutes.",
      createdAt: "2026-06-16T07:45:00.000Z",
    },
  ]),
  dm(ceren, john, [
    {
      id: "m-cj1",
      author: john,
      content: "Ceren, can you send me the launch risk summary before the board call?",
      createdAt: "2026-06-15T17:00:00.000Z",
    },
    {
      id: "m-cj2",
      author: ceren,
      content: "Already in FloVault. I'll flag the two open budget items in comments.",
      createdAt: "2026-06-15T17:12:00.000Z",
    },
  ]),
  dm(ceren, mohamed, [
    {
      id: "m-cm1",
      author: mohamed,
      content: "Tier 1 interns are cleared for masterclass access, no finance module yet.",
      createdAt: "2026-06-16T06:50:00.000Z",
    },
    {
      id: "m-cm2",
      author: ceren,
      content: "Got it. I'll nudge Claudia on her onboarding checklist today.",
      createdAt: "2026-06-16T07:05:00.000Z",
    },
  ]),
  dm(ceren, claudia, [
    {
      id: "m-cc1",
      author: ceren,
      content: "How's day 3 of onboarding going? Anything blocking you?",
      createdAt: "2026-06-16T08:00:00.000Z",
    },
    {
      id: "m-cc2",
      author: claudia,
      content: "All good, finished the workspace tour. Starting the launch checklist next.",
      createdAt: "2026-06-16T08:15:00.000Z",
    },
  ]),
  dm(ceren, serina, [
    {
      id: "m-cs1",
      author: serina,
      content: "Thanks for approving the executive links grant, I can see the sidebar now.",
      createdAt: "2026-06-15T13:30:00.000Z",
    },
    {
      id: "m-cs2",
      author: ceren,
      content: "Welcome! Let me know if you need project progress access too.",
      createdAt: "2026-06-15T13:45:00.000Z",
    },
  ]),
  dm(ceren, rebecca, [
    {
      id: "m-cr1",
      author: rebecca,
      content: "Hero wireframes are ready, want a quick review before I share with Diogo?",
      createdAt: "2026-06-16T07:20:00.000Z",
    },
    {
      id: "m-cr2",
      author: ceren,
      content: "Yes, send the Figma link. I'll leave comments before 10:00.",
      createdAt: "2026-06-16T07:28:00.000Z",
    },
  ]),
  dm(ceren, kendra, [
    {
      id: "m-ck1",
      author: kendra,
      content: "Growth campaign copy is in the shared doc, feedback welcome.",
      createdAt: "2026-06-16T06:30:00.000Z",
    },
    {
      id: "m-ck2",
      author: ceren,
      content: "Reading now. Strong opener, let's tighten the CTA on slide 2.",
      createdAt: "2026-06-16T06:48:00.000Z",
    },
  ]),
  dm(diogo, rebecca, [
    {
      id: "m-dr1",
      author: rebecca,
      content: "Want a quick design review on the nav icons?",
      createdAt: "2026-06-15T15:10:00.000Z",
    },
    {
      id: "m-dr2",
      author: diogo,
      content: "Yes, free after 15:30. I'll hop into Design Buddy if that's easier.",
      createdAt: "2026-06-15T15:18:00.000Z",
    },
  ]),
  dm(diogo, claudia, [
    {
      id: "m-dcl1",
      author: claudia,
      content: "Diogo, could you walk me through the design handoff process?",
      createdAt: "2026-06-14T11:00:00.000Z",
    },
    {
      id: "m-dcl2",
      author: diogo,
      content: "Happy to, let's do 20 minutes after standup tomorrow.",
      createdAt: "2026-06-14T11:12:00.000Z",
    },
  ]),
];

export const chatRooms: ChatRoom[] = [...channelRooms, ...directRooms];

export function findChatRoomByDirectPair(userId: string, otherUserId: string): ChatRoom | undefined {
  const id = directRoomId(userId, otherUserId);
  return chatRooms.find((room) => room.id === id);
}
