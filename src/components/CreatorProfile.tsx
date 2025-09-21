import { useState } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Star, 
  TrendingUp, 
  Clock, 
  Users, 
  Share, 
  Heart, 
  MessageCircle,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Award
} from 'lucide-react';

export function CreatorProfile() {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data - in real app, fetch based on ID
  const creator = {
    id: 1,
    name: "Kwame Asante",
    title: "Afrobeat Producer & Sound Engineer",
    bio: "Passionate music producer specializing in Afrobeats fusion with electronic elements. I've worked with over 15 emerging artists and have been producing music for 5 years. My goal is to bridge African rhythms with global sounds and create the next generation of world music.",
    image: "https://images.unsplash.com/photo-1571990455341-c06400a41071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0aXN0JTIwbXVzaWMlMjBjcmVhdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM5ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Lagos, Nigeria",
    joinDate: "January 2024",
    website: "kwameasante.music",
    bondPrice: "0.05 ETH",
    timePrice: "0.001 ETH/hr",
    totalBonds: 1000,
    available: 750,
    growth: "+23%",
    followers: 1247,
    verified: true,
    category: "Music",
    skills: ["Music Production", "Sound Engineering", "Beat Making", "Mixing & Mastering"],
    achievements: [
      "Produced 3 albums that charted in Nigerian top 10",
      "Collaborated with Grammy-nominated artists",
      "Featured in major music festivals",
      "Over 2M streams on digital platforms"
    ]
  };

  const priceHistory = [
    { date: 'Jan', price: 0.032 },
    { date: 'Feb', price: 0.038 },
    { date: 'Mar', price: 0.045 },
    { date: 'Apr', price: 0.041 },
    { date: 'May', price: 0.050 },
    { date: 'Jun', price: 0.055 }
  ];

  const milestones = [
    {
      title: "Complete EP Production",
      description: "Produce and deliver 5-track EP for emerging artist",
      deadline: "Dec 2024",
      reward: "50 Time Tokens",
      status: "in-progress"
    },
    {
      title: "Music Festival Performance",
      description: "Perform at major African music festival",
      deadline: "Mar 2025",
      reward: "100 Time Tokens",
      status: "upcoming"
    },
    {
      title: "International Collaboration",
      description: "Collaborate with international artist on cross-cultural track",
      deadline: "Jun 2025",
      reward: "200 Time Tokens",
      status: "upcoming"
    }
  ];

  const activities = [
    {
      type: "milestone",
      content: "Completed studio setup milestone",
      time: "2 hours ago",
      icon: Award
    },
    {
      type: "trade",
      content: "25 Time Tokens purchased by @musiclover",
      time: "5 hours ago",
      icon: TrendingUp
    },
    {
      type: "update",
      content: "Posted new work sample: 'Lagos Nights Beat'",
      time: "1 day ago",
      icon: Star
    },
    {
      type: "trade",
      content: "Life Bond price increased to 0.05 ETH",
      time: "2 days ago",
      icon: TrendingUp
    }
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8 bg-gradient-to-r from-gray-900/80 to-black/80 border-purple-500/20">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={creator.image}
                  alt={creator.name}
                  className="w-48 h-48 object-cover rounded-xl"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl">{creator.name}</h1>
                      {creator.verified && (
                        <Badge className="bg-blue-600/80 text-white border-none">
                          <Star className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                        {creator.category}
                      </Badge>
                    </div>
                    <p className="text-xl text-purple-400 mb-4">{creator.title}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={isFollowing ? "outline" : "default"}
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={isFollowing 
                        ? "border-purple-500/30 text-purple-400 hover:bg-purple-500/10" 
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      }
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">{creator.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl text-purple-400">{creator.followers}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-green-400">{creator.bondPrice}</div>
                    <div className="text-sm text-gray-400">Bond Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-blue-400">{creator.available}</div>
                    <div className="text-sm text-gray-400">Available Bonds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-pink-400">{creator.growth}</div>
                    <div className="text-sm text-gray-400">30d Growth</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {creator.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {creator.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    {creator.website}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy Life Bond ({creator.bondPrice})
          </Button>
          <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
            <Clock className="w-4 h-4 mr-2" />
            Buy Time ({creator.timePrice}/hr)
          </Button>
          <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </motion.div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-purple-500/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Price Chart */}
              <Card className="lg:col-span-2 p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                <h3 className="text-xl mb-4">Bond Price History</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #7C3AED', 
                        borderRadius: '8px' 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#EC4899', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Skills & Achievements */}
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                  <h3 className="text-xl mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.skills.map((skill) => (
                      <Badge key={skill} className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                  <h3 className="text-xl mb-4">Key Achievements</h3>
                  <ul className="space-y-2">
                    {creator.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <Award className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="grid gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg">{milestone.title}</h3>
                        <Badge className={
                          milestone.status === 'in-progress' 
                            ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                        }>
                          {milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-3">{milestone.description}</p>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span>Deadline: {milestone.deadline}</span>
                        <span>Reward: {milestone.reward}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20">
              <h3 className="text-xl mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30">
                      <div className="p-2 rounded-lg bg-purple-600/20">
                        <Icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300">{activity.content}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="p-6 bg-gradient-to-b from-gray-900/50 to-black/50 border-purple-500/20 text-center">
              <h3 className="text-xl mb-4">Portfolio Coming Soon</h3>
              <p className="text-gray-400">
                {creator.name} is currently preparing their portfolio showcase. 
                Check back soon to see their latest work and projects.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}