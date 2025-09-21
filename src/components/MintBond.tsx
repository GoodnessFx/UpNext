import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { 
  Coins, 
  Clock, 
  Target, 
  Image as ImageIcon,
  Plus,
  X,
  Info,
  CheckCircle2
} from 'lucide-react';

export function MintBond() {
  const [bondType, setBondType] = useState('time');
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [milestones, setMilestones] = useState([{ title: '', description: '', reward: '' }]);
  const [royaltyEnabled, setRoyaltyEnabled] = useState(false);
  const [royaltyPercentage, setRoyaltyPercentage] = useState([10]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', reward: '' }]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const updated = milestones.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setMilestones(updated);
  };

  const bondTypes = [
    {
      id: 'time',
      title: 'Time Bonds',
      description: 'Sell your time in hourly tokens',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'milestone',
      title: 'Milestone Bonds',
      description: 'Raise funds for specific goals',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'royalty',
      title: 'Royalty Bonds',
      description: 'Share future revenue streams',
      icon: Coins,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl mb-4">Mint Your Life Bond</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Turn your time, talent, and potential into tradeable assets. 
            Let the world invest in your future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bond Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <h2 className="text-xl mb-4">Choose Bond Type</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {bondTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          bondType === type.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => setBondType(type.id)}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm mb-1">{type.title}</h3>
                        <p className="text-xs text-gray-400">{type.description}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <h2 className="text-xl mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Bond Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Music Producer Services"
                        className="bg-gray-800/50 border-purple-500/20 focus:border-purple-500/40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="bg-gray-800/50 border-purple-500/20">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="art">Art & Design</SelectItem>
                          <SelectItem value="blockchain">Blockchain</SelectItem>
                          <SelectItem value="writing">Writing</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you offer, your experience, and your goals..."
                      className="bg-gray-800/50 border-purple-500/20 focus:border-purple-500/40 min-h-[100px]"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <Label>Skills & Expertise</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="bg-gray-800/50 border-purple-500/20 focus:border-purple-500/40"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Bond Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <h2 className="text-xl mb-4">Bond Configuration</h2>
                <div className="space-y-4">
                  {bondType === 'time' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate (ETH)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            step="0.001"
                            placeholder="0.001"
                            className="bg-gray-800/50 border-purple-500/20 focus:border-purple-500/40"
                          />
                        </div>
                        <div>
                          <Label htmlFor="totalHours">Total Hours Available</Label>
                          <Input
                            id="totalHours"
                            type="number"
                            placeholder="1000"
                            className="bg-gray-800/50 border-purple-500/20 focus:border-purple-500/40"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {bondType === 'milestone' && (
                    <div>
                      <Label>Project Milestones</Label>
                      {milestones.map((milestone, index) => (
                        <Card key={index} className="p-4 bg-gray-800/30 border-gray-600 mb-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-sm text-gray-300">Milestone {index + 1}</h4>
                            {milestones.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMilestone(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Input
                              placeholder="Milestone title"
                              value={milestone.title}
                              onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                              className="bg-gray-700/50 border-purple-500/20"
                            />
                            <Textarea
                              placeholder="Milestone description"
                              value={milestone.description}
                              onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                              className="bg-gray-700/50 border-purple-500/20"
                            />
                            <Input
                              placeholder="Reward (ETH)"
                              value={milestone.reward}
                              onChange={(e) => updateMilestone(index, 'reward', e.target.value)}
                              className="bg-gray-700/50 border-purple-500/20"
                            />
                          </div>
                        </Card>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addMilestone}
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Milestone
                      </Button>
                    </div>
                  )}

                  {bondType === 'royalty' && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enable Revenue Sharing</Label>
                          <p className="text-sm text-gray-400">Share a percentage of future earnings</p>
                        </div>
                        <Switch
                          checked={royaltyEnabled}
                          onCheckedChange={setRoyaltyEnabled}
                        />
                      </div>
                      {royaltyEnabled && (
                        <div>
                          <Label>Revenue Share Percentage: {royaltyPercentage[0]}%</Label>
                          <Slider
                            value={royaltyPercentage}
                            onValueChange={setRoyaltyPercentage}
                            max={50}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Media Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <h2 className="text-xl mb-4">Media & Portfolio</h2>
                <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Upload images, videos, or portfolio samples</p>
                  <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    Choose Files
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-b from-purple-900/20 to-pink-900/20 border-purple-500/30 sticky top-24">
                <h3 className="text-lg mb-4">Bond Preview</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="capitalize">{bondType} Bond</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category</span>
                    <span className="capitalize">{category || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Skills</span>
                    <span>{skills.length} added</span>
                  </div>
                  {bondType === 'milestone' && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Milestones</span>
                      <span>{milestones.length} defined</span>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 text-sm mb-1">Minting Fee</p>
                      <p className="text-xs text-gray-400">
                        2% platform fee + gas costs will be deducted from your bond
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Coins className="w-4 h-4 mr-2" />
                  Mint Life Bond
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">
                    By minting, you agree to our{' '}
                    <a href="#" className="text-purple-400 hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Success Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Set realistic hourly rates based on your experience</li>
                  <li>• Include portfolio samples to build trust</li>
                  <li>• Define clear, achievable milestones</li>
                  <li>• Be authentic in your description</li>
                  <li>• Engage with your investors regularly</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}