"use client"
import { useTheme} from 'next-themes';
import { useEffect, useState } from 'react'
import { Tabs } from '../ui/tabs';
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { SunIcon } from '@radix-ui/react-icons';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
    useEffect(() => {
			setMounted(true);
		}, []);
  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className='border'>
        <TabsTrigger value='light' onClick={() => setTheme('light')}>
          <SunIcon className='h-[1.2rem] w-[1.2rem]'/>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher;

