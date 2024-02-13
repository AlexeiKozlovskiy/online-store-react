import './ProfilePage.scss';
import { useState } from 'react';
import { ProfileSection } from '@/components/SectionProfile/ProfileSection';
import { FavoritesSection } from '@/components/SectionFavorites/FavoritesSection';
import { MyShoppingSection } from '@/components/SectionMyShopping/MyShoppingSection';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function ProfilePage() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentSection(newValue);
  };

  return (
    <main className="profile">
      <h2 className="profile__titel">MY PROFILE</h2>
      <div className="profile__container">
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={currentSection}
              onChange={handleChange}
              aria-label="basic tabs"
              centered
              sx={{ '& .MuiTabs-indicator': { background: '#2e8b57' } }}
            >
              <Tab
                sx={{ '&.Mui-selected': { color: '#2e8b57' } }}
                label="Profile"
                data-testid="profile"
                {...a11yProps(0)}
              />
              <Tab
                sx={{ '&.Mui-selected': { color: '#2e8b57' } }}
                label="Favorites"
                data-testid="favorites"
                {...a11yProps(1)}
              />
              <Tab
                sx={{ '&.Mui-selected': { color: '#2e8b57' } }}
                label="My Shoppings"
                data-testid="shopping"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={currentSection} index={0}>
            <ProfileSection />
          </CustomTabPanel>
          <CustomTabPanel value={currentSection} index={1}>
            <FavoritesSection />
          </CustomTabPanel>
          <CustomTabPanel value={currentSection} index={2}>
            <MyShoppingSection />
          </CustomTabPanel>
        </Box>
      </div>
    </main>
  );
}
