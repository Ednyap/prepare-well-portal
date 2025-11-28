import React, { useState } from 'react';
import { Calendar, Heart, Activity, Apple, CheckCircle, Circle, LogOut, Moon, Footprints, Brain, Zap, Watch, Lightbulb, BookOpen, Smile, Meh, Frown } from 'lucide-react';

const PrepareWellPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [completedDays, setCompletedDays] = useState(new Set());
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [showWearableModal, setShowWearableModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [journalEntry, setJournalEntry] = useState('');
  const [todayMood, setTodayMood] = useState(null);

  // Biometric data (would come from wearable in production)
  const [biometrics, setBiometrics] = useState({
    sleep: 7.5,
    steps: 8234,
    stressLevel: 42,
    surgeryReadiness: 78
  });

  // Demo users for testing
  const users = {
    'demo@preparewell.com': { password: 'demo123', name: 'Sarah', currentDay: 5 },
    'patient@example.com': { password: 'patient123', name: 'Michael', currentDay: 12 }
  };

  // 30-day program content
  const programContent = {
    1: {
      affirmation: 'I am taking positive steps toward my health and wellbeing.',
      exercise: [
        '15 minutes of leisurely walking',
        'Sit to stand from chair, 10 reps',
        'Shoulder blade squeeze, 10 reps, 2 sets'
      ],
      nutrition: [
        'Add an extra serving of vegetables to a meal',
        'Start your morning with warm lemon water or herbal tea',
        'Drink 8 glasses of water throughout the day'
      ],
      wellness: [
        'Write down a comforting phrase to remember',
        'Place your hand on your heart and take 3 slow breaths',
        'Set aside 5 minutes for quiet reflection'
      ],
      insight: 'Stress and anxiety can affect how your body responds to surgery. Just 5 minutes of focused breathing or meditation each day can lower cortisol levels and improve recovery.',
      journalPrompt: 'List three things you are doing this week to take care of yourself.'
    },
    2: {
      affirmation: 'Each day, I grow stronger and more prepared.',
      exercise: [
        '20 minutes of walking at a comfortable pace',
        'Wall pushups, 8 reps, 2 sets',
        'Gentle leg lifts while seated, 10 reps each leg'
      ],
      nutrition: [
        'Include a source of lean protein in each meal',
        'Choose whole grain bread or pasta today',
        'Limit processed foods and opt for fresh ingredients'
      ],
      wellness: [
        'Practice gratitude by writing down three things you appreciate',
        'Listen to calming music for 10 minutes',
        'Stretch your neck and shoulders gently'
      ],
      insight: 'Quality sleep is essential for healing. Adults who get 7 to 9 hours of sleep have better immune function and faster recovery times after medical procedures.',
      journalPrompt: 'What does feeling prepared mean to you right now?'
    },
    3: {
      affirmation: 'I trust my body and support it with healthy choices.',
      exercise: [
        '15 minutes of light stretching or yoga',
        'Marching in place, 2 minutes',
        'Arm circles forward and backward, 10 reps each direction'
      ],
      nutrition: [
        'Eat mindfully without distractions during one meal',
        'Add berries or citrus fruit to your day',
        'Try a new vegetable you have not had in a while'
      ],
      wellness: [
        'Write a kind message to yourself',
        'Take three deep belly breaths when you feel tension',
        'Spend a few minutes in natural light or near a window'
      ],
      insight: 'Staying hydrated supports every system in your body. Proper hydration helps maintain blood pressure, supports kidney function, and keeps your skin and tissues healthy.',
      journalPrompt: 'Describe one small victory you have had this week.'
    },
    4: {
      affirmation: 'I am capable, resilient, and ready for positive change.',
      exercise: [
        '25 minutes of walking, including gentle hills if available',
        'Standing calf raises, 12 reps, 2 sets',
        'Seated torso twists, 10 reps each side'
      ],
      nutrition: [
        'Include healthy fats like avocado, nuts, or olive oil',
        'Prepare a colorful salad with at least 4 different vegetables',
        'Avoid sugary drinks and choose water or herbal tea'
      ],
      wellness: [
        'Call or text someone who makes you feel supported',
        'Practice progressive muscle relaxation for 5 minutes',
        'Identify one stressor and brainstorm a small solution'
      ],
      insight: 'Regular movement improves circulation and can reduce the risk of blood clots. Even gentle activity helps prepare your cardiovascular system for surgery.',
      journalPrompt: 'What are you most looking forward to after your recovery?'
    },
    5: {
      affirmation: 'My body knows how to heal, and I support it every day.',
      exercise: [
        '20 minutes of swimming or water aerobics if available',
        'Knee lifts while standing, 10 reps each leg',
        'Gentle chest stretches, hold for 15 seconds, 3 reps'
      ],
      nutrition: [
        'Eat a rainbow: include red, orange, yellow, green, and purple foods',
        'Have a handful of nuts or seeds as a snack',
        'Cook a meal from scratch using fresh ingredients'
      ],
      wellness: [
        'Write down your top three health goals',
        'Practice visualization: imagine yourself healthy and strong',
        'Do something creative for 10 minutes'
      ],
      insight: 'Nutrition plays a key role in wound healing. Protein, vitamin C, and zinc are especially important for tissue repair and immune function.',
      journalPrompt: 'How has your relationship with your body changed during this program?'
    }
  };

  // Generate remaining days with similar structure
  for (let i = 6; i <= 30; i++) {
    programContent[i] = {
      affirmation: `Day ${i}: I am committed to my health and wellbeing journey.`,
      exercise: [
        `${15 + i} minutes of moderate activity`,
        'Strength exercise focused on core stability',
        'Flexibility and balance work'
      ],
      nutrition: [
        'Focus on whole, unprocessed foods',
        'Stay well hydrated throughout the day',
        'Include a variety of colorful vegetables'
      ],
      wellness: [
        'Practice mindfulness or meditation',
        'Connect with supportive people in your life',
        'Engage in an activity that brings you joy'
      ],
      insight: 'Consistency in healthy habits creates lasting change. Each day you show up for yourself, you build resilience and strength.',
      journalPrompt: `Reflect on your progress. What has surprised you most about day ${i}?`
    };
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (users[email] && users[email].password === password) {
      setCurrentUser({ ...users[email], email });
      setIsLoggedIn(true);
    } else {
      setError('Invalid email or password. Try demo@preparewell.com / demo123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  const toggleDayCompletion = (day) => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedDays(newCompleted);
  };

  const connectWearable = (device) => {
    setConnectedDevice(device);
    setShowWearableModal(false);
    // In production, this would trigger actual device OAuth flow
  };

  const disconnectWearable = () => {
    setConnectedDevice(null);
  };

  const getStressColor = (level) => {
    if (level <= 30) return 'text-green-600';
    if (level <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReadinessColor = (level) => {
    if (level >= 70) return 'text-green-600';
    if (level >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const toggleCheckItem = (category, index) => {
    const key = `${currentDay}-${category}-${index}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isItemChecked = (category, index) => {
    const key = `${currentDay}-${category}-${index}`;
    return checkedItems[key] || false;
  };

  const moodOptions = [
    { value: 1, label: 'Not my best', emoji: '😟' },
    { value: 2, label: 'A bit off', emoji: '😕' },
    { value: 3, label: 'Okay', emoji: '😐' },
    { value: 4, label: 'Good', emoji: '🙂' },
    { value: 5, label: 'Great', emoji: '😊' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Prepare Well Health</h1>
            <p className="text-gray-600">Welcome to your wellness journey</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin(e);
                  }
                }}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-2">Demo Accounts:</p>
            <p>demo@preparewell.com / demo123</p>
            <p>patient@example.com / patient123</p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            This platform provides wellness coaching and does not constitute medical advice. Please consult with your healthcare provider for medical concerns.
          </p>
        </div>

        {showWearableModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wearable</h2>
              <p className="text-gray-600 mb-6">Choose your device to sync biometric data automatically.</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => connectWearable('apple')}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Apple Watch</p>
                    <p className="text-sm text-gray-600">Connect via Apple Health</p>
                  </div>
                </button>

                <button
                  onClick={() => connectWearable('fitbit')}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Fitbit</p>
                    <p className="text-sm text-gray-600">Connect via Fitbit API</p>
                  </div>
                </button>

                <button
                  onClick={() => connectWearable('garmin')}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    ⌚
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Garmin</p>
                    <p className="text-sm text-gray-600">Connect via Garmin Connect</p>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowWearableModal(false)}
                className="w-full mt-6 text-gray-600 hover:text-gray-800 font-medium py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentDay = currentUser.currentDay;
  const todayContent = programContent[currentDay];
  const progressPercentage = Math.round((completedDays.size / 30) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Prepare Well Health</h1>
              <p className="text-sm text-gray-600">Welcome back, {currentUser.name}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Your 30-Day Progress</h2>
              <div className="text-right">
                <p className="text-4xl font-bold text-green-600">Day {currentDay}</p>
                <p className="text-sm text-gray-600">of 30</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Completion</span>
                <span className="text-sm font-bold text-green-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-600">
              You have completed {completedDays.size} out of 30 days. Keep up the great work!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Wearable Device</h2>
              <Watch className="w-6 h-6 text-blue-600" />
            </div>
            
            {connectedDevice ? (
              <div>
                <div className="flex items-center space-x-3 mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    {connectedDevice === 'apple' && <span className="text-2xl"></span>}
                    {connectedDevice === 'fitbit' && <span className="text-2xl">📱</span>}
                    {connectedDevice === 'garmin' && <span className="text-2xl">⌚</span>}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {connectedDevice === 'apple' && 'Apple Watch'}
                      {connectedDevice === 'fitbit' && 'Fitbit'}
                      {connectedDevice === 'garmin' && 'Garmin'}
                    </p>
                    <p className="text-sm text-green-600">Connected</p>
                  </div>
                </div>
                <button
                  onClick={disconnectWearable}
                  className="w-full text-red-600 hover:text-red-700 font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                  Disconnect Device
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">Connect your wearable device to track your biometrics automatically.</p>
                <button
                  onClick={() => setShowWearableModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Connect Wearable
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Biometric Dashboard</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Moon className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{biometrics.sleep}h</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Sleep Duration</p>
              <p className="text-xs text-gray-600 mt-1">Last night</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Footprints className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-green-600">{biometrics.steps.toLocaleString()}</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Steps Today</p>
              <p className="text-xs text-gray-600 mt-1">Goal: 10,000</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-8 h-8 text-yellow-600" />
                <span className={`text-3xl font-bold ${getStressColor(biometrics.stressLevel)}`}>
                  {biometrics.stressLevel}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Stress Level</p>
              <p className="text-xs text-gray-600 mt-1">Lower is better</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-purple-600" />
                <span className={`text-3xl font-bold ${getReadinessColor(biometrics.surgeryReadiness)}`}>
                  {biometrics.surgeryReadiness}%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Surgery Readiness</p>
              <p className="text-xs text-gray-600 mt-1">Based on all metrics</p>
            </div>
          </div>

          {!connectedDevice && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
              Connect a wearable device to see real-time biometric data and personalized insights.
            </div>
          )}
        </div>

        <div className="grid gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Today's Affirmation</h3>
            <p className="text-lg text-gray-700 italic">{todayContent.affirmation}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Checklist</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Exercise</h4>
                </div>
                <div className="space-y-2 ml-7">
                  {todayContent.exercise.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleCheckItem('exercise', index)}
                        className="mt-1 flex-shrink-0"
                      >
                        {isItemChecked('exercise', index) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </button>
                      <span className={`text-gray-700 ${isItemChecked('exercise', index) ? 'line-through text-gray-400' : ''}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Apple className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Nutrition</h4>
                </div>
                <div className="space-y-2 ml-7">
                  {todayContent.nutrition.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleCheckItem('nutrition', index)}
                        className="mt-1 flex-shrink-0"
                      >
                        {isItemChecked('nutrition', index) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </button>
                      <span className={`text-gray-700 ${isItemChecked('nutrition', index) ? 'line-through text-gray-400' : ''}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-800">Wellness</h4>
                </div>
                <div className="space-y-2 ml-7">
                  {todayContent.wellness.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleCheckItem('wellness', index)}
                        className="mt-1 flex-shrink-0"
                      >
                        {isItemChecked('wellness', index) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </button>
                      <span className={`text-gray-700 ${isItemChecked('wellness', index) ? 'line-through text-gray-400' : ''}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Wellness Insight</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{todayContent.insight}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-800">Journal Prompt</h3>
            </div>
            <p className="text-gray-700 mb-3 font-medium">{todayContent.journalPrompt}</p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Today I feel:</h3>
            <div className="flex justify-between items-center gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setTodayMood(mood.value)}
                  className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    todayMood === mood.value
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-4xl mb-2">{mood.emoji}</span>
                  <span className="text-sm font-medium text-gray-700 text-center">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Your 30-Day Calendar</h3>
          </div>
          
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const isCompleted = completedDays.has(day);
              const isCurrent = day === currentDay;
              
              return (
                <button
                  key={day}
                  onClick={() => toggleDayCompletion(day)}
                  className={`aspect-square rounded-lg font-semibold transition-all ${
                    isCurrent
                      ? 'bg-green-600 text-white ring-4 ring-green-200'
                      : isCompleted
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm">{day}</span>
                    {isCompleted && <CheckCircle className="w-3 h-3 mt-1" />}
                  </div>
                </button>
              );
            })}
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            Click on any day to mark it as complete. Your current day is highlighted in green.
          </p>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
          <p className="font-semibold mb-1">Important Reminder</p>
          <p>This platform provides wellness coaching and does not constitute medical advice. Please consult with your healthcare provider before starting any new exercise or nutrition program.</p>
        </div>
      </main>
    </div>
  );
};

export default PrepareWellPortal;