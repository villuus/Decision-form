import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";

export default function IdeaEvaluationForm() {
  const [step, setStep] = useState(1);
  const [ideas, setIdeas] = useState([{ name: "", scores: {} }]);
  const criteria = ["Feasibility", "Cost", "Impact", "Alignment", "Timeframe"];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleIdeaChange = (index, field, value) => {
    const updatedIdeas = [...ideas];
    updatedIdeas[index][field] = value;
    setIdeas(updatedIdeas);
  };

  const handleScoreChange = (index, criterion, value) => {
    const updatedIdeas = [...ideas];
    updatedIdeas[index].scores[criterion] = parseInt(value);
    setIdeas(updatedIdeas);
  };

  const totalScores = ideas.map(idea => {
    return {
      ...idea,
      total: criteria.reduce((sum, criterion) => sum + (idea.scores[criterion] || 0), 0)
    };
  });

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Enter Your Ideas</h2>
              {ideas.map((idea, index) => (
                <div key={index} className="mb-2">
                  <Label>Idea {index + 1}</Label>
                  <Input
                    value={idea.name}
                    onChange={(e) => handleIdeaChange(index, "name", e.target.value)}
                    placeholder="Enter idea name"
                  />
                </div>
              ))}
              <Button onClick={() => setIdeas([...ideas, { name: "", scores: {} }])} className="mt-2">
                Add Another Idea
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Rate Each Idea</h2>
              {ideas.map((idea, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{idea.name}</h3>
                  {criteria.map(criterion => (
                    <div key={criterion} className="mb-2">
                      <Label>{criterion}</Label>
                      <Select
                        value={idea.scores[criterion] || ""}
                        onChange={(e) => handleScoreChange(index, criterion, e.target.value)}
                      >
                        {[1, 2, 3, 4, 5].map(score => (
                          <SelectItem key={score} value={score}>{score}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Evaluation Results</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Idea</th>
                    {criteria.map(criterion => (
                      <th key={criterion} className="border p-2">{criterion}</th>
                    ))}
                    <th className="border p-2">Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  {totalScores.map((idea, index) => (
                    <tr key={index} className="border">
                      <td className="border p-2">{idea.name}</td>
                      {criteria.map(criterion => (
                        <td key={criterion} className="border p-2">{idea.scores[criterion] || 0}</td>
                      ))}
                      <td className="border p-2 font-bold">{idea.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            {step > 1 && <Button onClick={handlePrev}>Back</Button>}
            {step < 3 && <Button onClick={handleNext}>Next</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
