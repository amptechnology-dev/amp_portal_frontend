import {
  FaDribbble,
  FaTools,
  FaTruck,
  FaLightbulb,
  FaCode,
  FaTrash,
  FaSolarPanel,
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaHandsHelping,
  FaRecycle,
  FaBolt,
  FaGlobe,
  FaWrench,
  FaServer,
  FaPaintBrush,
} from "react-icons/fa";

// Single source of truth — used in BOTH admin form (dropdown + preview)
// and user-side ServiceGrid (rendering the saved icon)
export const SERVICE_ICONS = {
  dribbble: { label: "Dribbble (Default)", icon: FaDribbble },
  tools: { label: "Tools", icon: FaTools },
  truck: { label: "Truck / Transport", icon: FaTruck },
  lightbulb: { label: "Lightbulb / Idea", icon: FaLightbulb },
  code: { label: "Code", icon: FaCode },
  trash: { label: "Trash / Waste", icon: FaTrash },
  solar: { label: "Solar Panel", icon: FaSolarPanel },
  laptop: { label: "Laptop / Software", icon: FaLaptopCode },
  mobile: { label: "Mobile App", icon: FaMobileAlt },
  cloud: { label: "Cloud", icon: FaCloud },
  shield: { label: "Security", icon: FaShieldAlt },
  chart: { label: "Growth / Chart", icon: FaChartLine },
  cogs: { label: "Settings / Cogs", icon: FaCogs },
  support: { label: "Support / Helping Hands", icon: FaHandsHelping },
  recycle: { label: "Recycle / Eco", icon: FaRecycle },
  bolt: { label: "Energy / Bolt", icon: FaBolt },
  globe: { label: "Web / Global", icon: FaGlobe },
  wrench: { label: "Maintenance / Wrench", icon: FaWrench },
  server: { label: "Server / Hosting", icon: FaServer },
  design: { label: "Design / Paintbrush", icon: FaPaintBrush },
};

export function getServiceIcon(key) {
  return SERVICE_ICONS[key]?.icon || FaDribbble;
}
