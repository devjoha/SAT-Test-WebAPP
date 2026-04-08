interface Choice {
  letter: string;
  text: string;
}

interface AnswerPanelProps {
  choices: Choice[];
  selectedAnswer: string | null;
  onSelect: (letter: string) => void;
}

export default function AnswerPanel({ choices, selectedAnswer, onSelect }: AnswerPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white border-l border-gray-200">
      <div className="p-6 flex-1">
        <div className="space-y-3">
          {choices.map((choice) => {
            const isSelected = selectedAnswer === choice.letter;
            return (
              <button
                key={choice.letter}
                onClick={() => onSelect(choice.letter)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg border text-left transition-all duration-150 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-400"
                    : "border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                <span
                  className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold transition-colors ${
                    isSelected
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-400 bg-white text-gray-700"
                  }`}
                >
                  {choice.letter}
                </span>
                <span className={`text-[15px] leading-snug ${isSelected ? "text-blue-900" : "text-gray-800"}`}>
                  {choice.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
