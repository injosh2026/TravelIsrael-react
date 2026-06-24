const typeColors = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
];

export const getTypeStyle = (typeName: string) => {
  const hash = typeName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
  return typeColors[hash % typeColors.length];
};