import { useState } from 'react';
import { User, Lock, Bell, Shield, Save, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    role: user?.role === 'admin' ? 'Administrator' : 'Agent',
    bio: 'Experienced real estate professional with a passion for helping clients find their dream homes.',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newInquiries: true,
    propertyUpdates: true,
    marketingEmails: false,
    smsNotifications: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: profileData.name,
        email: profileData.email,
        // Assuming bio can also be updated via updateUser
        bio: profileData.bio,
      });
      toast.success('Profile updated successfully');
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-dark">Settings</h1>
        <p className="font-body text-dark/60">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="w-4 h-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="relative">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-dark text-white rounded-full flex items-center justify-center hover:bg-dark/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        updateUser({ avatar: undefined });
                        toast.success('Profile photo removed');
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="font-body text-xs text-dark/50">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Full Name
                  </label>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-dark mb-2 block">
                    Role
                  </label>
                  <Input value={user?.role || 'Admin'} disabled />
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-dark mb-2 block">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-beige"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="font-body text-sm font-medium text-dark mb-2 block">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-dark mb-2 block">
                  New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-dark mb-2 block">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handlePasswordSave}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    Email Notifications
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Receive email notifications about account activity
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    New Inquiries
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Get notified when you receive a new inquiry
                  </p>
                </div>
                <Switch
                  checked={notifications.newInquiries}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      newInquiries: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    Property Updates
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Notifications about property status changes
                  </p>
                </div>
                <Switch
                  checked={notifications.propertyUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      propertyUpdates: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    Marketing Emails
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Receive promotional emails and newsletters
                  </p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      marketingEmails: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    SMS Notifications
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Receive text messages for urgent updates
                  </p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      smsNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => toast.success('Notification preferences saved')}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    Two-Factor Authentication
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    Login History
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    View recent login activity on your account
                  </p>
                </div>
                <Button variant="outline">View History</Button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-display font-medium text-dark">
                    Active Sessions
                  </h4>
                  <p className="font-body text-sm text-dark/60">
                    Manage devices logged into your account
                  </p>
                </div>
                <Button variant="outline">Manage Sessions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
