import { ProductType } from '@/types';

export interface HighlightItem {
  icon: 'zap' | 'shield' | 'sparkles' | 'cpu' | 'battery' | 'volume' | 'wifi' | 'feather';
  title: string;
  description: string;
}

export interface DetailGalleryImage {
  url: string;
  title: string;
  caption: string;
}

export interface SpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

export interface InTheBoxItem {
  name: string;
  quantity: string;
  note?: string;
}

export interface ProductRichInfo {
  tagline: string;
  highlights: HighlightItem[];
  narrativeParagraphs: string[];
  gallery: DetailGalleryImage[];
  specGroups: SpecGroup[];
  inTheBox: InTheBoxItem[];
  warrantyHighlights: string[];
}

export interface RealisticReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  variant: string;
  comment: string;
  photos?: string[];
  helpfulCount: number;
  verifiedPurchase: boolean;
  storeResponse?: string;
}

export const REALISTIC_REVIEWS_POOL: RealisticReview[] = [
  {
    id: 'rev-1',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '3 days ago',
    variant: 'Color: Phantom Black • Flagship Pro Edition',
    comment: 'Arrived packaged in triple-layered protective cushioning with tamper-evident factory seals intact. The CNC-machined anodized aluminum housing feels astonishingly solid with zero rattling parts. Tested across 48 continuous hours—battery life matches specifications perfectly, and multipoint Bluetooth switches between my MacBook and phone within one second. Superb value for money!',
    photos: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 42,
    verifiedPurchase: true,
    storeResponse: 'VoltMart Official Store: Thank you for your support and detailed review, Marcus! We are thrilled to hear that the build and seamless multipoint audio meet your standards. If you ever need technical support or firmware assistance, our team is at your disposal 24/7!'
  },
  {
    id: 'rev-2',
    userName: 'Sarah Jenkins',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '1 week ago',
    variant: 'Color: Silver Titanium • Standard Edition',
    comment: 'Super fast delivery. Soundstage is remarkably expansive—the sub-bass hits with visceral authority without bleeding into the midrange vocals. The earcups are delightfully cushioned with memory foam; I wore them through a 6-hour editing sprint without any fatigue or pressure hotspots.',
    photos: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 29,
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'David Miller',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    variant: 'Color: Moonlight White • Flagship Pro Edition',
    comment: 'Clean Scandinavian-inspired industrial aesthetic that looks gorgeous on any modern desk setup. The physical tactile dials have satisfying mechanical feedback, and companion device synchronization is instantaneous. Customer care answered my questions within five minutes!',
    helpfulCount: 17,
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 4,
    date: '3 weeks ago',
    variant: 'Color: Midnight Grey • Standard Edition',
    comment: 'Industrial build quality is easily a 10/10. Hybrid ANC cancels out about 85% of ambient office noise and HVAC hum. Only minor critique is the protective hardcase is slightly bulky in my commuter backpack, but overall hardware performance and acoustic clarity are stellar.',
    helpfulCount: 11,
    verifiedPurchase: true,
    storeResponse: 'VoltMart Official Store: Thank you for the thoughtful feedback, Elena! We have noted your comments regarding the protective travel case dimensions for our future accessory line revisions.'
  },
  {
    id: 'rev-5',
    userName: 'Jason Hayes',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '1 month ago',
    variant: 'Color: Phantom Black • Flagship Pro Edition',
    comment: 'Purchased during the launch promotion. Successfully verified the serial number on the official VoltMart warranty registry for the full 2-year guarantee. Microphone beamforming is crystal clear on Zoom calls even in noisy cafe environments.',
    photos: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 23,
    verifiedPurchase: true
  },
  {
    id: 'rev-6',
    userName: 'Chloe Zhao',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '1 month ago',
    variant: 'Color: Matte Black • Studio Pro Edition',
    comment: 'Having owned numerous high-end studio headsets, the high-frequency treble detail on this unit completely blew me away. Vocal micro-dynamics and acoustic string pluck transients are fully resolved without any harsh sibilance.',
    helpfulCount: 19,
    verifiedPurchase: true
  }
];

export function getProductRichInfo(product: ProductType): ProductRichInfo {
  const titleLower = (product.title || '').toLowerCase();
  const descLower = (product.description || '').toLowerCase();

  // Audio / Headphones / Speakers
  if (
    titleLower.includes('headphone') ||
    titleLower.includes('audio') ||
    titleLower.includes('speaker') ||
    titleLower.includes('earphone') ||
    titleLower.includes('sound') ||
    titleLower.includes('iem') ||
    descLower.includes('sound')
  ) {
    return {
      tagline: 'Pinnacle Acoustic Precision & Next-Generation Adaptive Hybrid ANC',
      highlights: [
        {
          icon: 'volume',
          title: '45mm Custom Beryllium Drivers',
          description: 'Certified Hi-Res audio reproduction with an extended 10Hz - 45,000Hz frequency response and vanishingly low distortion.'
        },
        {
          icon: 'shield',
          title: '42dB Hybrid Adaptive ANC',
          description: 'Dedicated neural audio coprocessor analyzes ambient environmental noise in real-time for continuous acoustic isolation.'
        },
        {
          icon: 'battery',
          title: 'Up to 65 Hours of Battery Life',
          description: 'Fast-Fuel USB-C Power Delivery charging: 10 minutes of charge provides 6 full hours of continuous playback.'
        },
        {
          icon: 'wifi',
          title: 'Bluetooth 5.4 Low Latency',
          description: 'Supports lossless LDAC, aptX Adaptive, and AAC codecs with sub-35ms ultra-low latency multipoint connectivity.'
        }
      ],
      narrativeParagraphs: [
        `Engineered to stringent mastering-studio benchmarks, the ${product.title} unites advanced acoustic architecture with lightweight ergonomic comfort. Every component—from the aerospace-grade anodized aluminum gimbal to the breathable memory-foam ear cushions—has been calibrated for zero-fatigue listening across entire days of work or leisure.`,
        'Dual beamforming microphone arrays powered by real-time neural noise cancellation isolate your vocal transients, guaranteeing pristine speech clarity on conference calls and outdoor commutes.',
        'Directly backed by the VoltMart Official Flagship Store with holographic authenticity seals, digital serial number warranty activation, and an unconditional 30-day return policy.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
          title: 'Precision CNC Machining & Ergonomic Contours',
          caption: 'Ultra-lightweight magnesium alloy headband with breathable protein leather cushioning to eliminate crown pressure.'
        },
        {
          url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
          title: 'Tactile Mechanical Controls & High-Speed I/O',
          caption: 'Integrated 3.5mm lossless analog bypass jack and high-speed USB-C Power Delivery port.'
        },
        {
          url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
          title: 'Immersive Spatial Soundstage Experience',
          caption: 'Dynamic head-tracking spatial audio creates an expansive, theatre-grade 360-degree acoustic environment.'
        }
      ],
      specGroups: [
        {
          group: 'Acoustic Architecture & Drivers',
          items: [
            { label: 'Acoustic Driver', value: '45mm Custom Beryllium Dome' },
            { label: 'Frequency Response', value: '10Hz - 45,000Hz (Hi-Res Certified)' },
            { label: 'Nominal Impedance', value: '32 Ohms ± 15%' },
            { label: 'Sensitivity (SPL)', value: '108 dB / 1mW @ 1kHz' },
            { label: 'Total Harmonic Distortion', value: '< 0.08% @ 1kHz' }
          ]
        },
        {
          group: 'Connectivity & Protocols',
          items: [
            { label: 'Bluetooth Version', value: 'Bluetooth 5.4 LE Audio' },
            { label: 'Supported Codecs', value: 'LDAC, aptX Adaptive, AAC, SBC' },
            { label: 'Wireless Range', value: 'Up to 50 ft (15 meters) line of sight' },
            { label: 'Multipoint Pairing', value: 'Simultaneous 2-device seamless handoff' }
          ]
        },
        {
          group: 'Battery & Power Management',
          items: [
            { label: 'Battery Capacity', value: '850 mAh Li-Po Polymer Cell' },
            { label: 'Playback Runtime', value: 'Up to 65h (ANC Off) / 45h (ANC On)' },
            { label: 'Recharge Time', value: 'Approx. 90 minutes via USB-C' },
            { label: 'Fast-Fuel Quick Charge', value: '10 min charge = 6 hours playback' }
          ]
        },
        {
          group: 'Build Materials & Dimensions',
          items: [
            { label: 'Chassis Construction', value: 'Anodized Aircraft Aluminum & Magnesium' },
            { label: 'Earpad Material', value: 'Breathable Memory Foam & Protein Leather' },
            { label: 'Weight', value: '248g (Ultra-lightweight)' },
            { label: 'Ingress Protection', value: 'IPX4 Water & Sweat Resistant' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x ${product.title} Hardware`, quantity: '1 Unit', note: 'Factory Sealed with Hologram' },
        { name: '1x Shockproof Hard-Shell Travel Case', quantity: '1 Unit', note: 'Reinforced Metal Zipper' },
        { name: '1x Braided USB-C to USB-C Fast-Charge Cable (1.2m)', quantity: '1 Piece', note: 'Power Delivery Ready' },
        { name: '1x Gold-Plated 3.5mm Lossless Audio Cable (1.2m)', quantity: '1 Piece', note: 'Oxygen-Free Copper' },
        { name: '1x Dual-Prong Airline Flight Adapter', quantity: '1 Piece' },
        { name: '1x Quick Start Guide & Official 2-Year Warranty Card', quantity: '1 Set' }
      ],
      warrantyHighlights: [
        'Official 2-Year Full Hardware Replacement Warranty via digital serial number',
        '30-Day Hassle-Free Return & Exchange guarantee',
        'Lifetime firmware optimization via the VoltMart companion suite',
        'Free expedited shipping both ways for warranty diagnostics'
      ]
    };
  }

  // Computing / Keyboard / Mouse / Workspace
  if (
    titleLower.includes('keyboard') ||
    titleLower.includes('mouse') ||
    titleLower.includes('desk') ||
    titleLower.includes('chair') ||
    titleLower.includes('monitor') ||
    titleLower.includes('dock') ||
    titleLower.includes('laptop') ||
    titleLower.includes('stand') ||
    descLower.includes('desk') ||
    descLower.includes('work')
  ) {
    return {
      tagline: 'Peak Ergonomic Workflow & High-Frequency Professional Computing',
      highlights: [
        {
          icon: 'cpu',
          title: '8,000Hz Ultra-High Polling Rate',
          description: 'Sub-millisecond signal response delivering instantaneous input registration for latency-critical professional tasks.'
        },
        {
          icon: 'sparkles',
          title: 'CNC Anodized Monolithic Chassis',
          description: 'Milled from aerospace-grade aluminum with a fingerprint-resistant matte bead-blasted surface finish.'
        },
        {
          icon: 'feather',
          title: 'Scientifically Tuned Ergonomics',
          description: 'Engineered wrist-relief angle reduces forearm pronation fatigue by up to 40% over prolonged sessions.'
        },
        {
          icon: 'zap',
          title: 'Tri-Mode Universal Connectivity',
          description: 'Seamlessly shift between 2.4GHz dongle wireless, low-energy Bluetooth 5.3, and detachable braided USB-C.'
        }
      ],
      narrativeParagraphs: [
        `Elevate your executive workstation with the ${product.title}. Combining understated architectural minimalism with uncompromised engineering, it delivers effortless productivity for software engineers, creative directors, and power users.`,
        'Every keypress and motion threshold is calibrated to micrometer precision, ensuring deeply satisfying mechanical tactility with dampened acoustics that keep your office environment undisturbed.',
        'Rigorously stress-tested through 80+ million actuation cycles in VoltMart hardware validation labs to guarantee unwavering consistency year after year.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
          title: 'Minimalist Architecture for Modern Workspaces',
          caption: 'Harmonizes seamlessly into clean minimalist and high-performance creative studio setups.'
        },
        {
          url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
          title: 'Ergonomic Palm & Wrist Angle',
          caption: 'Calculated incline supports natural biomechanical posture and relieves muscle strain.'
        },
        {
          url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
          title: 'Universal Multi-OS Compatibility',
          caption: 'Instant hardware toggles between macOS, Windows, Linux, and iPadOS key layouts.'
        }
      ],
      specGroups: [
        {
          group: 'Core Hardware & Actuation',
          items: [
            { label: 'Sensor / Switch Architecture', value: 'High-Precision Optical / Factory-Lubed Mechanical' },
            { label: 'Polling Rate', value: 'Configurable 1,000Hz - 8,000Hz Ultra-Fast' },
            { label: 'Resolution / Sensitivity', value: 'Dynamic 100 - 26,000 DPI' },
            { label: 'Lifecycle Durability', value: 'Rated for 80,000,000+ continuous operations' }
          ]
        },
        {
          group: 'Connectivity & System Compatibility',
          items: [
            { label: 'Connection Modes', value: 'Tri-Mode: 2.4GHz Wireless, Bluetooth 5.3, USB-C' },
            { label: 'Included Receiver', value: 'USB-A 2.4GHz Nano Receiver with USB-C Adapter' },
            { label: 'Supported Platforms', value: 'Windows 10/11, macOS 12+, Linux, iPadOS, Android' },
            { label: 'Onboard Memory', value: '5 Hardware Profiles with instantaneous profile switching' }
          ]
        },
        {
          group: 'Power & Dimensions',
          items: [
            { label: 'Battery Chemistry', value: '4,000mAh Rechargeable Lithium-Ion Cell' },
            { label: 'Battery Longevity', value: 'Up to 200 hours (Backlight Off) / 72 hours (Active)' },
            { label: 'Charging Interface', value: 'USB Type-C Fast Charge 5V/1A' },
            { label: 'Weight', value: 'Optimized 680g ergonomic ballast balance' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x ${product.title} Device`, quantity: '1 Unit', note: 'Original Factory Box' },
        { name: '1x 2.4GHz Ultra-Low Latency USB Receiver', quantity: '1 Piece', note: '1ms Response' },
        { name: '1x Braided USB-C to USB-A Cable (1.8m)', quantity: '1 Piece', note: 'Shielded Ferrite Core' },
        { name: '1x USB-C to USB-A Precision Adapter', quantity: '1 Piece' },
        { name: '1x Maintenance Tool & Cleaning Kit', quantity: '1 Set' },
        { name: '1x User Documentation & 2-Year Official Warranty Card', quantity: '1 Set' }
      ],
      warrantyHighlights: [
        '24-Month Comprehensive Manufacturer Hardware Warranty',
        '30-Day Hassle-Free 1-to-1 Replacement on technical defects',
        'Lifetime companion utility suite access and driver support',
        'Direct serial-number activation via packaging QR code'
      ]
    };
  }

  // Smart Wearables / Gear / Watches
  if (
    titleLower.includes('watch') ||
    titleLower.includes('wearable') ||
    titleLower.includes('smart') ||
    titleLower.includes('ring') ||
    titleLower.includes('band') ||
    titleLower.includes('tracker')
  ) {
    return {
      tagline: 'Comprehensive Biometric Telemetry & Rugged Titanium Elegance',
      highlights: [
        {
          icon: 'sparkles',
          title: '1.43-Inch Ultra AMOLED Display',
          description: '1,000 nits peak brightness, sapphire crystal scratch defense, and legible viewing under direct sunlight.'
        },
        {
          icon: 'shield',
          title: 'Bio-Sensor 5.0 Photonic Array',
          description: 'Continuous 24/7 heart-rate telemetry, blood oxygen (SpO2) tracking, stress analysis, and clinical-grade sleep phase scoring.'
        },
        {
          icon: 'battery',
          title: 'Exceptional 14-Day Battery Life',
          description: 'Intelligent power-efficient dual-core architecture paired with rapid magnetic wireless charging.'
        },
        {
          icon: 'zap',
          title: '5ATM Water Resistance & Standalone GPS',
          description: 'Waterproof down to 50 meters with multi-constellation GNSS route tracking without requiring a phone.'
        }
      ],
      narrativeParagraphs: [
        `The ${product.title} is your definitive companion for an active, health-conscious lifestyle. Crafted with a lightweight aerospace titanium bezel and curved 3D sapphire glass, it asserts refined elegance in both athletic and formal settings.`,
        'With over 120 dedicated workout disciplines ranging from marathon running to open-water swimming, it detects routines automatically and offers scientifically grounded recovery recommendations.',
        'Full two-way communication enables clear Bluetooth calling via the noise-cancelling microphone and speaker, managing your notifications effortlessly without pulling out your smartphone.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
          title: 'Sapphire Crystal Face & Titanium Bezel',
          caption: 'Mohs 9H hardness sapphire glass resists scratches from everyday abrasives and active outdoor use.'
        },
        {
          url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1200&q=80',
          title: '8-Channel Biometric Optical Telemetry',
          caption: 'Ceramic caseback housing multi-wavelength photodiode clusters designed for hypoallergenic skin comfort.'
        },
        {
          url: 'https://images.unsplash.com/photo-1510519138197-06b8628c6711?auto=format&fit=crop&w=1200&q=80',
          title: 'Quick-Release Antimicrobial Fluoroelastomer Strap',
          caption: 'Compatible with standard 22mm bands in leather, steel mesh, and sports nylon.'
        }
      ],
      specGroups: [
        {
          group: 'Display & Visuals',
          items: [
            { label: 'Screen Technology', value: 'AMOLED True Color 1.43-Inch' },
            { label: 'Native Resolution', value: '466 x 466 pixels (326 PPI Density)' },
            { label: 'Peak Brightness', value: '1,000 nits Auto-Adapting' },
            { label: 'Always-On Display', value: 'Hardware-level AOD with 100+ customizable faces' }
          ]
        },
        {
          group: 'Health Telemetry & Sensors',
          items: [
            { label: 'Optical Biometrics', value: 'Bio-Tracker PPG 5.0 (Continuous 24/7)' },
            { label: 'Blood Oxygen Sensor', value: 'True-pulse SpO2 monitoring' },
            { label: 'Satellite Positioning', value: 'Dual-Band GNSS: GPS, GLONASS, Galileo, BeiDou' },
            { label: 'Water Ingress Rating', value: '5ATM (50 meters static immersion)' }
          ]
        },
        {
          group: 'Battery & Communication',
          items: [
            { label: 'Battery Endurance', value: 'Up to 14 days under standard use' },
            { label: 'GPS Tracking Endurance', value: 'Up to 32 hours continuous geolocation' },
            { label: 'Charging Method', value: 'Magnetic wireless inductive dock' },
            { label: 'Wireless Standards', value: 'Bluetooth 5.3 BLE, Wi-Fi 2.4GHz, One-Tap NFC' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x ${product.title} Smartwatch`, quantity: '1 Unit', note: 'Factory Sealed' },
        { name: '1x Antimicrobial Fluoroelastomer Sport Band', quantity: '1 Set' },
        { name: '1x Magnetic Wireless Charging Cradle (USB)', quantity: '1 Piece' },
        { name: '1x Anti-Reflective Screen Protector', quantity: '1 Piece' },
        { name: '1x User Manual & 2-Year Official Warranty Card', quantity: '1 Set' }
      ],
      warrantyHighlights: [
        'Official 2-Year Flagship Hardware Warranty coverage',
        '30-Day Hassle-Free Replacement for any manufacturing variance',
        'Dedicated customer engineering support available 24/7',
        'Nationwide authorized repair center network'
      ]
    };
  }

  // Gaming / Controllers / Consoles
  if (
    titleLower.includes('game') ||
    titleLower.includes('gaming') ||
    titleLower.includes('controller') ||
    titleLower.includes('console') ||
    titleLower.includes('pad')
  ) {
    return {
      tagline: 'Esports-Grade Control Precision & Hall-Effect Drift-Free Mastery',
      highlights: [
        {
          icon: 'zap',
          title: 'Hall-Effect Electromagnetic Analog Sticks',
          description: 'Zero physical contact points eliminate analog drift entirely with mechanical durability exceeding 5 million rotations.'
        },
        {
          icon: 'cpu',
          title: 'Dual Mechanical Trigger Stops',
          description: 'Instantly toggle trigger travel from smooth full-range linear pull to instant microswitch hair-trigger clicks.'
        },
        {
          icon: 'sparkles',
          title: 'Dual Haptic Actuation Rumble',
          description: 'Authentically conveys in-game recoil, terrain textures, and engine vibrations for absolute sensory immersion.'
        },
        {
          icon: 'wifi',
          title: 'True 1,000Hz Polling Rate Wireless',
          description: 'Sub-1ms transmission latency across 2.4GHz wireless without signal packet interference.'
        }
      ],
      narrativeParagraphs: [
        `Dominate competitive tournaments with the ${product.title}. The ergonomic contouring and micro-textured rubberized grip provide unwavering handling even during marathon high-stakes matches.`,
        'Equipped with 4 remappable rear macro paddles that let you execute complex button combinations and weapon swaps instantly without leaving the thumbsticks. Fully compatible with PC Windows, Steam Deck, Nintendo Switch, Android, and iOS.',
        'Precision engineered and validated by esports competitors to meet tournament-grade operational standards.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=80',
          title: 'Ergonomic Grip Architecture',
          caption: 'Micro-diamond pattern ensures confident grip retention and heat dissipation.'
        },
        {
          url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
          title: 'Customizable Multi-Zone RGB Lighting',
          caption: 'Synchronize dynamic lighting themes and game telemetry feedback in real time.'
        },
        {
          url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
          title: 'Anti-Drift Hall Sensor Thumbsticks',
          caption: 'Electromagnetic sensor precision preserves deadzone fidelity across years of aggressive gameplay.'
        }
      ],
      specGroups: [
        {
          group: 'Buttons & Input Mechanics',
          items: [
            { label: 'Thumbsticks', value: 'Hall Effect Electromagnetic (Anti-Drift)' },
            { label: 'Triggers (LT/RT)', value: 'Hall Magnetic Linear with 2-Stage Travel Lock' },
            { label: 'D-Pad & Face Buttons', value: 'Mechanical Microswitches rated for 10M clicks' },
            { label: 'Rear Paddles', value: '4 Remappable Tactile Macro Switches' }
          ]
        },
        {
          group: 'Connectivity & System Compatibility',
          items: [
            { label: 'Connectivity Modes', value: '2.4GHz Wireless, Bluetooth 5.2, USB-C Wired' },
            { label: 'Supported Platforms', value: 'PC (Windows 10/11), Steam Deck, Switch, Android, iOS' },
            { label: 'Polling Frequency', value: '1,000Hz (Wired & 2.4GHz) / 250Hz (Bluetooth)' }
          ]
        },
        {
          group: 'Battery & Ergonomics',
          items: [
            { label: 'Battery Capacity', value: '1,200 mAh High-Density Lithium-Ion' },
            { label: 'Continuous Game Time', value: '25-30 hours per full charge cycle' },
            { label: 'Weight', value: '265g (Precision balanced center-of-mass)' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x ${product.title} Controller`, quantity: '1 Unit', note: 'Factory Sealed' },
        { name: '1x 2.4GHz Low-Latency USB Wireless Dongle', quantity: '1 Piece' },
        { name: '1x Reinforced Braided USB-C Cable (2.0m)', quantity: '1 Piece' },
        { name: '2x Ergonomic Convex Thumbstick Caps', quantity: '2 Pairs' },
        { name: '1x 2-Year Official Warranty Card & Quick Setup Guide', quantity: '1 Set' }
      ],
      warrantyHighlights: [
        'Official 2-Year Manufacturer Warranty with zero-drift guarantee',
        'Immediate 30-day replacement on hardware defects',
        'Free calibration utility and firmware updates',
        'Dedicated 24/7 customer support via direct chat'
      ]
    };
  }

  // Default Fallback Rich Info (Electronics / Tech)
  return {
    tagline: 'Precision Engineering & Uncompromising Flagship Standards',
    highlights: [
      {
        icon: 'sparkles',
        title: 'Flagship Build Quality',
        description: 'Aerospace-grade materials and rigorous manufacturing tolerances guarantee refined durability.'
      },
      {
        icon: 'cpu',
        title: 'Next-Gen Processing',
        description: 'Optimized efficiency delivers fluid responsiveness while conserving power reserves.'
      },
      {
        icon: 'shield',
        title: '2-Year Full Warranty',
        description: '30-day return policy and official digital warranty backed by the VoltMart Flagship network.'
      },
      {
        icon: 'zap',
        title: 'Universal Ecosystem Sync',
        description: 'Seamlessly interfaces across mobile, desktop, and professional computing platforms.'
      }
    ],
    narrativeParagraphs: [
      `The ${product.title} exemplifies precision craftsmanship built to world-class manufacturing tolerances. Every joint, contour, and surface finish has been refined to serve modern power users.`,
      'Equipped with advanced internal architectures that ensure rapid response times, optimal power conservation, and unwavering operational reliability across demanding workloads.',
      'Distributed officially by the VoltMart Official Flagship Store with complete CE, FCC, and RoHS certifications, genuine serial verification, and dedicated customer support.'
    ],
    gallery: [
      {
        url: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
        title: 'Detailed Macro View of Industrial Design',
        caption: 'Electrostatic nano-coating shields against fine surface scratches and fingerprint oils.'
      },
      {
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
        title: 'High-Bandwidth Universal Connectivity',
        caption: 'Features modern standardized ports with instantaneous plug-and-play driver handoffs.'
      },
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
        title: 'Elevated Professional Workspace Aesthetic',
        caption: 'Complements clean, executive-level computing environments with subtle sophistication.'
      }
    ],
    specGroups: [
      {
        group: 'Core Hardware Specifications',
        items: [
          { label: 'Brand & Model', value: `VoltMart ${product.title}` },
          { label: 'SKU / Model ID', value: product.sku || 'VLT-PRO-SERIES' },
          { label: 'Certifications', value: 'CE, FCC, RoHS, ISO 9001' },
          { label: 'Stock Availability', value: `${product.stock} units ready for immediate dispatch` }
        ]
      },
      {
        group: 'Materials & Surface Finish',
        items: [
          { label: 'Exterior Shell', value: 'Anodized Aircraft Aluminum & Thermally Stable Polycarbonate' },
          { label: 'Colorway Finish', value: 'Matte Black / Space Gray / Titanium' },
          { label: 'Cycle Durability', value: 'Tested for 100,000+ operational hours' }
        ]
      },
      {
        group: 'Warranty & Logistics',
        items: [
          { label: 'Warranty Period', value: '24 Months (1-to-1 replacement within 30 days)' },
          { label: 'Warranty Mechanism', value: 'Official digital serial registry' },
          { label: 'Authorized Vendor', value: 'VoltMart Official Flagship Store' }
        ]
      }
    ],
    inTheBox: [
      { name: `1x ${product.title} Hardware`, quantity: '1 Unit', note: 'Factory Sealed' },
      { name: '1x High-Bandwidth Braided USB-C Cable', quantity: '1 Piece' },
      { name: '1x Accessory & Adapter Pack', quantity: '1 Set' },
      { name: '1x User Guide & Warranty Documentation', quantity: '1 Set' },
      { name: '1x VoltMart 2-Year Official Digital Warranty Card', quantity: '1 Piece' }
    ],
    warrantyHighlights: [
      'Official 24-month manufacturer warranty with nationwide coverage',
      'Hassle-free 30-day 1-to-1 replacement on factory defects',
      'Free two-way expedited shipping for verified service claims',
      '24/7 dedicated engineering support staff'
    ]
  };
}

