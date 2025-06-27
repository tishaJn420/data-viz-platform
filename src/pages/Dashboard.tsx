import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { openSlideOver, setHoveredDataPoint, closeSlideOver } from '../store/slices/uiSlice';
import DataPointDetails from '../components/DataPointDetails';
import Button from '../components/Button';
import { SparklesIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import clipboardTime from '../assets/clipboard-text-clock.png';
import bell from '../assets/bell.png';
import cloudUpload from '../assets/cloud-upload.png';
import cog from '../assets/cog.png';
import home from '../assets/home.png';
import profile from '../assets/Vector.png';
import recent from '../assets/recent.png';
import upload from '../assets/Frame 3770.png';
import lightning from '../assets/Lightning.png';

// Import from organized structure
import { CHART_DATA, KPI_DATA, CATEGORY_1_BUTTONS, CATEGORY_2_BUTTONS, CATEGORY_3_BUTTONS } from '../data';
import { LineChart } from '../charts';
import type { CategoryButton } from '../types';

const CategorySection = ({
  title,
  buttons,
  selected,
  onSelect,
  setHoveredPill
}: {
  title: string;
  buttons: CategoryButton[];
  selected: string[];
  onSelect: (id: string) => void;
  setHoveredPill: (id: string | null) => void;
}) => (
  <div className="mb-4">
    <div className="text-left font-inter font-medium text-sm lg:text-[15px] leading-[150%] tracking-[-0.023em] text-[#D5D5D5] mb-2">
      {title}
    </div>
    <div className="flex flex-wrap gap-2 lg:gap-4">
      {buttons.map(({ id, label }) => {
        const isSelected = selected.includes(id);
        return (
          <Button
            key={id}
            variant="pill"
            selected={isSelected}
            onClick={() => onSelect(id)}
            onMouseEnter={() => setHoveredPill(id)}
            onMouseLeave={() => setHoveredPill(null)}
            size="sm"
            className="text-xs lg:text-sm"
          >
            {label}
          </Button>
        );
      })}
    </div>
  </div>
);

function handleToggle(selected: string[], setSelected: (val: string[]) => void, id: string) {
  setSelected(
    selected.includes(id)
      ? selected.filter(selId => selId !== id)
      : [...selected, id]
  );
}

const TOOLTIP_HEIGHT = 93; // px, matches your class
const TOOLTIP_MARGIN = 12; // px, space above the point

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (active && payload && payload.length && coordinate) {
    const value = payload[0].value;
    const formattedValue = `$${(value / 1000).toFixed(2)}k`;
    const percent = 4.6; // Replace with your logic
    const percentLabel = 'above target'; // Replace with your logic

    // Position the tooltip above the data point
    const style: React.CSSProperties = {
      position: 'absolute',
      left: coordinate.x - 193 / 2, // center horizontally (193px is your tooltip width)
      top: coordinate.y - TOOLTIP_HEIGHT - TOOLTIP_MARGIN,
      pointerEvents: 'none',
      zIndex: 1000,
    };

    return (
      <div style={style} className="w-[193px] h-[93px] border border-[#525252] rounded-[5px] p-5 bg-[#22232433] backdrop-blur-[10px] flex flex-col gap-[10px]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-bold text-lg">{formattedValue}</span>
          <QuestionMarkCircleIcon className="w-4 h-4 text-[#BBBBBB]" />
        </div>
        <div className="flex items-center gap-2 text-[#B6FF6C] text-sm">
          <span className="w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#D4FF3F] bg-[#232323]">
            <ArrowUpIcon className="w-4 h-4 text-[#D4FF3F]" />
          </span>
          <span>{percent}% {percentLabel}</span>
        </div>
      </div>
    );
  }
  return null;
};

const category1Buttons = [
  { id: 'cat1-1', label: 'Carbon 1' },
  { id: 'cat1-2', label: 'Co2 Distribution' },
  { id: 'cat1-3', label: 'Fleet sizing' },
];
const category2Buttons = [
  { id: 'cat2-1', label: 'Parking Rate' },
  { id: 'cat2-2', label: 'Border Rate' },
  { id: 'cat2-3', label: 'Request rate' },
  { id: 'cat2-4', label: 'Variable 1' },
  { id: 'cat2-5', label: 'Variable 2' },
  { id: 'cat2-6', label: 'Variable 3' },
];
const category3Buttons = [
  { id: 'cat3-1', label: 'Variable 4' },
  { id: 'cat3-2', label: 'Variable 5' },
  { id: 'cat3-3', label: 'Variable 6' },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { isSlideOverOpen, hoveredDataPoint } = useSelector((state: RootState) => state.ui);
  const [activeTab, setActiveTab] = useState('Charging Stations');
  const [showNav] = useState(false);
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCat1, setSelectedCat1] = useState<string[]>([]);
  const [selectedCat2, setSelectedCat2] = useState<string[]>([]);
  const [selectedCat3, setSelectedCat3] = useState<string[]>([]);

  const handleNext = () => console.log('Next clicked');
  const handlePrev = () => console.log('Previous clicked');

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#000000] flex items-center justify-between p-4 border-b border-[#525252]">
        <div className="flex items-center">
          <Button
            variant="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-3"
          >
            <Bars3Icon className="w-6 h-6 text-white" />
          </Button>
          <div className="flex items-center">
            <img src={lightning} alt="charging station" className="h-6 mr-2" />
            <span className="text-lg font-bold text-white">Charging Station</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            icon={<img src={recent} alt="recent" className="w-5 h-5" />}
          />
          <Button
            variant="primary"
            onClick={() => dispatch(openSlideOver())}
            size="sm"
          >
            Edit
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative inset-y-0 left-0 z-50 w-64 md:w-20 bg-[#000000] flex flex-col items-center justify-between py-4 transition-transform duration-300 ease-in-out`}>
        {/* Mobile close button */}
        <div className="md:hidden absolute top-4 right-4">
          <Button
            variant="close"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </Button>
        </div>
        
        {/* Top section */}
        <div className="flex flex-col items-center gap-6 md:gap-10 w-full pt-8 md:pt-4">
          <Bars3Icon className="w-7 h-7 text-white mb-2" />
          <img src={home} alt="home" className="w-6 h-6" />
          <img src={bell} alt="bell" className="w-6 h-6" />
          <img src={clipboardTime} alt="clipboard time" className="w-6 h-6" />
          <img src={cloudUpload} alt="cloud upload" className="w-6 h-6" />
          <img src={cog} alt="cog" className="w-6 h-6" />
        </div>
        {/* Bottom section */}
        <div className="flex flex-col items-center w-full">
          <img src={profile} alt="Profile" className="w-6 h-6" />
        </div>
      </aside>

      {/* Main content */}
      <section className="bg-[#161618] flex-1 flex flex-col">
        {/* Desktop Header */}
        <header className="hidden md:flex w-full bg-[#000000] h-[87px] justify-between items-center pt-5 pb-5 pl-6 pr-6">
          <div className="flex items-center space-x-2 lg:space-x-4">
            {['Charging Stations', 'Fleet Sizing', 'Parking'].map(tab => (
              <Button
                key={tab}
                variant="tab"
                selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className="text-sm lg:text-base"
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[19.37px] h-[19.37px] z-10 pointer-events-none">
                {/* Search icon */}
                <svg width="19.37" height="19.37" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#EDEDED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                className="w-[180px] lg:w-[237px] h-[37px] rounded-[5px] border border-[#5A5A5A] pt-2 pr-3 pb-2 pl-12 bg-[#2C2E334D] backdrop-blur-[24px] text-[#EDEDED] font-inter font-medium text-[14px] leading-[150%] tracking-[-2.3%] placeholder-[#EDEDED] relative z-0"
                placeholder="Search"
                style={{
                  fontFamily: 'Inter',
                  letterSpacing: '-2.3%'
                }}
              />
            </div>
          </div>
        </header>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden bg-[#000000] border-b border-[#525252] p-2">
          <div className="flex items-center justify-center space-x-1">
            {['Charging Stations', 'Fleet Sizing', 'Parking'].map(tab => (
              <Button
                key={tab}
                variant="tab"
                selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                size="sm"
                className="text-xs px-2 py-1"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Data/chart section */}
        <div className="flex-1 border border-[#525252] rounded bg-[#161618] overflow-y-auto">
          <div className="mx-auto p-3 sm:p-4 lg:p-8">
            {/* Title and scenario results */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-3" style={{
              fontFamily: 'Roobert TRIAL, sans-serif',
              fontWeight: 700,
              lineHeight: '150%',
              color: '#FFFFFFFF'
            }}>
              <div className="flex items-center h-12">
                <img src={lightning} alt="charging station" className="h-6 lg:h-8 mr-2 lg:mr-4" />
                <span className="text-xl lg:text-[32px] font-bold m-0 p-0">Charging Station</span>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 h-[41px]">
                <Button
                  variant="icon"
                  icon={<img src={recent} alt="recent" className="w-5 h-5" />}
                  className="hidden sm:flex"
                />
                <Button
                  variant="primary"
                  onClick={() => dispatch(openSlideOver())}
                  size="sm"
                  className="sm:size-md"
                >
                  <span className="hidden sm:inline">Edit Variables</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
                <Button
                  variant="icon"
                  icon={<img src={upload} alt="upload" className="object-contain w-5 h-5" />}
                  className="hidden sm:flex"
                />
              </div>
            </div>
            <div className="bg-[#161618] rounded mb-2 flex flex-col gap-4 lg:gap-[24px]">
              {/* Header */}
              <div className="flex justify-between items-center pl-0 pr-2 lg:pr-4 py-2">
                <div className="flex items-center gap-2 lg:gap-2.5">
                  <SparklesIcon className="size-[16px] lg:size-[18px] text-[#DCFF7FFD]" />
                  <span className="font-[Roobert_TRIAL] font-semibold text-lg lg:text-[24px] text-[#DCFF7FFD] rounded">
                    Best Scenario Results
                  </span>
                </div>
                <span className="w-[36px] h-[28px] lg:w-[44px] lg:h-[34px] bg-[#18181A] border border-[#C8E972] rounded-[56px] flex items-center justify-center">
                  <ChevronUpIcon className="w-4 h-4 lg:w-5 lg:h-5 text-lime-300" />
                </span>
              </div>
              {/* Content rows */}
              <div className="font-[Inter] font-semibold text-sm lg:text-[16px] text-[#C9FF3B] flex items-center justify-between border-[0.5px] border-[#C8E972] rounded-[6px] pt-3 lg:pt-[15px] pr-3 lg:pr-[24px] pb-3 lg:pb-[15px] pl-3 lg:pl-[24px] bg-[##CCFF0005]">
                <span className="flex-1 pr-2">The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.</span>
                <span className="w-6 h-6 text-[#C8E972] flex-shrink-0">•••</span>
              </div>
              <div className="font-[Inter] font-semibold text-sm lg:text-[16px] text-[#C9FF3B] flex items-center justify-between border-[0.5px] border-[#C8E972] rounded-[6px] pt-3 lg:pt-[15px] pr-3 lg:pr-[24px] pb-3 lg:pb-[15px] pl-3 lg:pl-[24px] bg-[##CCFF0005]">
                <span className="flex-1 pr-2">The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.</span>
                <span className="w-6 h-6 text-[#C8E972] flex-shrink-0">•••</span>
              </div>
            </div>

            {/* Graphs and KPIs */}
            <div className={`flex flex-col xl:flex-row mt-6 lg:mt-8 ${isSlideOverOpen ? 'opacity-50' : ''} gap-4 lg:gap-[19px]`}>
              <div className="w-full xl:w-3/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl lg:text-2xl font-bold text-white">Graphs</span>
                </div>
                <div className="border border-[#525252] rounded-[5px] bg-[#222324] shadow-[0_4px_4px_0_#00000040] flex flex-col w-full"
                  style={{
                    height: '300px',
                    minHeight: '300px',
                    maxHeight: '300px',
                    padding: 0,
                    paddingRight: '20px',
                    margin: 0,
                  }}
                >
                  <div className="flex items-center justify-between px-3 pt-4 lg:pt-6 pb-2">
                    <span className="text-xl lg:text-2xl font-bold text-white"></span>
                    <Button
                      variant="dropdown"
                      size="sm"
                      icon={
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                    >
                      <span className="font-inter font-medium text-xs lg:text-[14px] leading-[150%] tracking-[-0.04em] pr-2 text-[#FCFCFC]">
                        Unsatisfied Demand %
                      </span>
                    </Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center pb-4 lg:pb-6 px-3 lg:px-6">
                    <LineChart
                      data={CHART_DATA}
                      isResponsive={true}
                      showGrid={true}
                      showReferenceLine={true}
                    />
                  </div>
                </div>
              </div>

              {/* KPI Section */}
              {!isSlideOverOpen &&
                <div className="w-full xl:w-2/5 flex flex-col items-center gap-1">
                  <div className="flex flex-col sm:flex-row items-center mb-1 w-full max-w-full xl:max-w-[530px] justify-around gap-2">
                    <span className="text-lg lg:text-2xl font-bold text-white text-center">Key Performance Indicators</span>
                    <Button
                      variant="kpi"
                      size="sm"
                      icon={<span className="text-xl lg:text-2xl flex items-center pl-1 pb-1">+</span>}
                    >
                      Variables
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[20px] w-full max-w-full xl:max-w-[502px]">
                    {KPI_DATA.map((kpi) => (
                      <div
                        key={kpi.title}
                        className="w-full h-auto min-h-[180px] lg:h-[221px] rounded-lg p-4 lg:p-6 border border-[#525252] text-white flex flex-col gap-2"
                        style={{
                          background: '#222324',
                          boxShadow: '0px 4px 4px 0px #00000040'
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-inter font-medium text-sm lg:text-[18px] leading-[100%] tracking-[-0.04em] text-[#FFFFFF]">
                            {kpi.title}
                          </div>
                          <QuestionMarkCircleIcon className="size-[12px] lg:size-[14px] text-[#888888]" />
                        </div>
                        <div className="font-inter font-light text-[10px] lg:text-[12px] leading-[150%] tracking-normal text-[#BBBBBB] mb-2">
                          {kpi.desc}
                        </div>
                        <div className="font-[Roobert_TRIAL] font-bold text-2xl lg:text-[32px] leading-[88%] tracking-[-0.02em] text-right text-[#FFFFFF] mt-auto">
                          {kpi.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Slide Over Panel */}
        {isSlideOverOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end backdrop-blur-xs backdrop-brightness-75">
            <div className="h-full flex items-center justify-end w-full">
              <div className="bg-[#18181A] border border-[#525252] rounded-[10px] shadow-2xl p-4 lg:p-6 w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] max-w-none h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 h-[36px] top-[42px] left-[32px] justify-content-space-between">
                  <span className="text-base lg:text-lg font-bold text-white">Edit Variables</span>
                  <Button
                    variant="close"
                    onClick={() => dispatch(closeSlideOver())}
                  >
                    X
                  </Button>
                </div>
                {/* Search, Autofill, Rerun */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
                  <div className='w-full'>
                    <div className="relative w-full">
                      <input
                        className="w-full h-9 rounded-[5px] border border-[#525252] bg-[#232323] pl-10 pr-3 text-white placeholder-[#A3A3A3] text-sm"
                        placeholder="Search"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '150%',
                          letterSpacing: '-2.3%',
                          background: '#18181A',
                        }}
                      />
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<SparklesIcon className="size-[14px] lg:size-[16px] text-[#D5D5D5]" />}
                      iconPosition="left"
                    >
                      <span className="hidden sm:inline">Autofill</span>
                      <span className="sm:hidden">Auto</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={
                        <svg width="24" height="24" className="lg:w-8 lg:h-8" viewBox="0 0 32 32" fill="none">
                          <path
                            d="M24 20C22.3431 22.3431 19.6569 24 16.5 24C11.2533 24 7 19.7467 7 14.5C7 9.25329 11.2533 5 16.5 5C20.1421 5 23.1957 7.23858 24.7082 10.5"
                            stroke="#C9FF3B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M24 10V14.5H19.5"
                            stroke="#C9FF3B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      iconPosition="left"
                    >
                      Rerun
                    </Button>
                  </div>
                </div>
                {/* Variable Categories */}
                <div className="flex flex-col gap-6 lg:gap-8 bg-[#232323] border border-[#525252] rounded-[5px] p-3 lg:p-4 overflow-y-auto">
                  {/* Category 1 */}
                  <CategorySection
                    title="Variable category 1"
                    buttons={CATEGORY_1_BUTTONS}
                    selected={selectedCat1}
                    onSelect={id => handleToggle(selectedCat1, setSelectedCat1, id)}
                    setHoveredPill={setHoveredPill}
                  />
                  {/* Category 2 */}
                  <CategorySection
                    title="Variable Category 2"
                    buttons={CATEGORY_2_BUTTONS}
                    selected={selectedCat2}
                    onSelect={id => handleToggle(selectedCat2, setSelectedCat2, id)}
                    setHoveredPill={setHoveredPill}
                  />
                  {/* Category 3 */}
                  <CategorySection
                    title="Variable Category 3"
                    buttons={CATEGORY_3_BUTTONS}
                    selected={selectedCat3}
                    onSelect={id => handleToggle(selectedCat3, setSelectedCat3, id)}
                    setHoveredPill={setHoveredPill}
                  />
                  {/* Variable Description Card */}
                  {hoveredPill && (
                    <div className="mt-2 w-full bg-[#232323] border border-[#525252] rounded-[5px] p-3 lg:p-4 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-semibold text-sm lg:text-base">
                          {(() => {
                            const allButtons = [...CATEGORY_1_BUTTONS, ...CATEGORY_2_BUTTONS, ...CATEGORY_3_BUTTONS];
                            return allButtons.find(btn => btn.id === hoveredPill)?.label || '';
                          })()}
                        </span>
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 text-[#BBBBBB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#BBBBBB">i</text>
                        </svg>
                      </div>
                      <div className="text-xs text-[#BBBBBB]">
                        But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you're a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.
                      </div>
                    </div>
                  )}
                </div>
                {/* Accordions */}
                <div className="mb-2 mt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-[#232323] border border-[#525252] rounded-[5px] px-3 lg:px-4 py-2 mb-2">
                    <span className="text-[#C9FF3B] font-medium text-base lg:text-[18px]">Primary Variables</span>
                    <div className="w-10 h-8 lg:w-12 lg:h-9 rounded-[20px] flex items-center justify-center bg-[#232323] border-2 border-[#C9FF3B]">
                      <svg width="16" height="16" className="lg:w-5 lg:h-5" fill="none" viewBox="0 0 20 20">
                        <path d="M6 8l4 4 4-4" stroke="#C9FF3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#232323] border border-[#525252] rounded-[5px] px-3 lg:px-4 py-2">
                    <span className="text-[#C9FF3B] font-medium text-base lg:text-[18px]">Secondary Variables</span>
                    <div className="w-10 h-8 lg:w-12 lg:h-9 rounded-[20px] flex items-center justify-center bg-[#232323] border-2 border-[#C9FF3B]">
                      <svg width="16" height="16" className="lg:w-5 lg:h-5" fill="none" viewBox="0 0 20 20">
                        <path d="M6 8l4 4 4-4" stroke="#C9FF3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                {showNav && (
                  <div className="flex justify-between">
                    <Button onClick={handlePrev}>Previous</Button>
                    <Button onClick={handleNext}>Next</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Data Point Details */}
      {hoveredDataPoint && (
        <DataPointDetails
          dataPoint={hoveredDataPoint}
          onClose={() => dispatch(setHoveredDataPoint(null))}
        />
      )}
    </div>
  );
}