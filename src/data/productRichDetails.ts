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
    userName: 'Nguyễn Hoàng Long',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '3 ngày trước',
    variant: 'Màu: Phantom Black • Bản Flagship Pro',
    comment: 'Hàng chính hãng đóng gói 3 lớp bóng khí cực kỳ cẩn thận. Mở hộp ra hoàn thiện nhôm anodized sờ mướt tay, không hề có chi tiết thừa. Đã test liên tục 2 ngày pin trâu đúng như quảng cáo, kết nối đa thiết bị chuyển qua lại giữa Macbook và điện thoại mượt mà trong 1 giây. Rất đáng đồng tiền bát gạo!',
    photos: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 42,
    verifiedPurchase: true,
    storeResponse: 'VoltMart Official Store cảm ơn anh Long đã tin tưởng ủng hộ sản phẩm! Chúc anh có những trải nghiệm công nghệ tuyệt vời cùng VoltMart. Khi cần hỗ trợ kỹ thuật hoặc bảo hành, anh vui lòng nhắn tin trực tiếp để nhân viên CSKH phục vụ anh nhanh nhất nhé!'
  },
  {
    id: 'rev-2',
    userName: 'Trần Minh Quân',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '1 tuần trước',
    variant: 'Màu: Silver Titanium • Bản Standard',
    comment: 'Giao hàng hỏa tốc trong 2 tiếng tại TP. HCM. Đóng seal nguyên vẹn có tem niêm phong chống hàng giả của VoltMart. Âm trường rộng, dải bass đập chắc nịch nhưng không bị lấn mid, nghe acoustic hay lofi chill cực đã. Form đeo êm, làm việc suốt 5 tiếng không hề bị đau vành tai.',
    photos: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 29,
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'Lê Thanh Hà',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '2 tuần trước',
    variant: 'Màu: Moonlight White • Bản Flagship Pro',
    comment: 'Thiết kế tối giản sang trọng theo phong cách Scandinavian, đặt lên bàn setup chụp ảnh sống ảo siêu đẹp. Các nút vật lý bấm đầm và có phản hồi cơ học chính xác, kết nối rất trực quan. Dịch vụ chăm sóc khách hàng của VoltMart trả lời siêu nhanh và nhiệt tình!',
    helpfulCount: 17,
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    userName: 'Đỗ Mạnh Hùng',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 4,
    date: '3 tuần trước',
    variant: 'Màu: Midnight Grey • Bản Standard',
    comment: 'Chất lượng hoàn thiện 10/10, chống ồn chủ động ANC triệt tiêu được tầm 85% tiếng ồn điều hòa và tạp âm văn phòng. Điểm trừ nhỏ là hộp đựng du lịch hơi to một chút bỏ balo hơi chiếm chỗ, còn lại mọi tính năng âm thanh và pin đều xuất sắc.',
    helpfulCount: 11,
    verifiedPurchase: true,
    storeResponse: 'Chào anh Hùng, VoltMart ghi nhận góp ý về kích thước travel case của dòng Flagship để cải tiến các phiên bản phụ kiện bao da gọn nhẹ hơn trong tương lai. Cảm ơn phản hồi thực tế vô cùng chi tiết của anh ạ!'
  },
  {
    id: 'rev-5',
    userName: 'Vũ Phương Linh',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '1 tháng trước',
    variant: 'Màu: Phantom Black • Bản Flagship Pro',
    comment: 'Mua đợt Flash Sale nhận voucher giảm giá hời dã man. Đã kiểm tra số serial trên website bảo hành điện tử chính hãng của VoltMart kích hoạt ngay 24 tháng. Âm thanh trong trẻo, mic đàm thoại hội thảo Zoom bắt tiếng rõ ràng kể cả khi ngồi quán cafe ồn.',
    photos: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 23,
    verifiedPurchase: true
  },
  {
    id: 'rev-6',
    userName: 'Phạm Đức Anh',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    date: '1 tháng trước',
    variant: 'Màu: Matte Black • Bản Pro Studio',
    comment: 'Đã dùng qua nhiều tai nghe cao cấp nhưng chiếc này thực sự làm mình bất ngờ về độ chi tiết của dải treble. Nghe tiếng lấy hơi ca sĩ, tiếng gảy đàn guitar mộc mạc rõ mồn một. VoltMart giao hàng nhanh, tư vấn kỹ càng.',
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
      tagline: 'Đỉnh Cao Kỹ Thuật Âm Học Chính Xác & Chống Ồn Thích Ứng Thế Hệ Mới',
      highlights: [
        {
          icon: 'volume',
          title: 'Màng Loa Beryllium 45mm',
          description: 'Tái tạo âm thanh độ phân giải cao Hi-Res Audio với dải tần mở rộng từ 10Hz - 45.000Hz không méo tiếng.'
        },
        {
          icon: 'shield',
          title: 'Chống Ồn Hybrid ANC 42dB',
          description: 'Bộ vi xử lý âm thanh AI thời gian thực phân tích tạp âm môi trường và khử ồn chủ động thích ứng liên tục.'
        },
        {
          icon: 'battery',
          title: 'Thời Lượng Pin Lên Đến 65 Giờ',
          description: 'Công nghệ sạc nhanh Fast-Fuel qua USB-C PD: Chỉ cần 10 phút sạc cho 6 giờ trải nghiệm âm nhạc liên tục.'
        },
        {
          icon: 'wifi',
          title: 'Bluetooth 5.4 Low Latency',
          description: 'Hỗ trợ codec LDAC, aptX Adaptive và AAC, kết nối đồng thời 2 thiết bị cùng lúc với độ trễ cực thấp dưới 35ms.'
        }
      ],
      narrativeParagraphs: [
        `Được chế tác tỉ mỉ dựa trên tiêu chuẩn âm học phòng thu khắt khe, ${product.title} kết hợp hoàn hảo giữa thiết kế công thái học hiện đại và công nghệ xử lý tín hiệu số DSP tân tiến. Từng chi tiết linh kiện từ khung hợp kim nhôm cấp hàng không vũ trụ đến đệm tai bọc da protein thoáng khí đều được tối ưu để mang lại cảm giác đeo nhẹ êm ái suốt cả ngày dài làm việc hoặc giải trí.`,
        'Hệ thống microphone kép trang bị thuật toán chùm tia Beamforming kết hợp công nghệ lọc gió AI ENC giúp giọng đàm thoại của bạn luôn trong trẻo, sắc nét tuyệt đối trong mọi cuộc gọi hội thảo online hay trò chuyện khi đang di chuyển ngoài đường phố đông đúc.',
        'Sản phẩm được phân phối chính hãng bởi VoltMart Official Store với tem chống hàng giả phản quang, mã QR kích hoạt bảo hành điện tử chính hãng 24 tháng toàn quốc và chính sách 1 đổi 1 trong 30 ngày đầu tiên.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
          title: 'Gia công CNC nguyên khối & Đệm bọc công thái học',
          caption: 'Khung hợp kim nhôm siêu nhẹ kết hợp đệm tai memory foam thoáng khí giảm áp lực đỉnh đầu.'
        },
        {
          url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
          title: 'Cổng giao tiếp đa phương tiện & Nút điều khiển xúc giác',
          caption: 'Tích hợp cổng 3.5mm lossless không suy hao tín hiệu và cổng USB-C sạc nhanh chuẩn Power Delivery.'
        },
        {
          url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
          title: 'Không gian trải nghiệm âm thanh sống động',
          caption: 'Hỗ trợ Spatial Audio mô phỏng không gian rạp hát 360 độ sống động theo chuyển động đầu.'
        }
      ],
      specGroups: [
        {
          group: 'Cấu hình Âm thanh & Kỹ thuật',
          items: [
            { label: 'Màng loa (Driver)', value: '45mm Custom Beryllium Dome' },
            { label: 'Dải tần đáp ứng', value: '10Hz - 45,000Hz (Hi-Res Certified)' },
            { label: 'Trở kháng danh định', value: '32 Ohms ± 15%' },
            { label: 'Độ nhạy (SPL)', value: '108 dB / 1mW @ 1kHz' },
            { label: 'Độ méo hài (THD)', value: '< 0.08% @ 1kHz' }
          ]
        },
        {
          group: 'Kết nối & Tương thích',
          items: [
            { label: 'Phiên bản Bluetooth', value: 'Bluetooth 5.4 LE Audio' },
            { label: 'Bộ giải mã Codec', value: 'LDAC, aptX Adaptive, AAC, SBC' },
            { label: 'Khoảng cách kết nối', value: 'Tối đa 15 mét không vật cản' },
            { label: 'Kết nối đa điểm', value: 'Hỗ trợ 2 thiết bị chuyển đổi tức thì' }
          ]
        },
        {
          group: 'Pin & Nguồn điện',
          items: [
            { label: 'Dung lượng pin', value: '850 mAh Li-Po Polymer' },
            { label: 'Thời lượng sử dụng', value: 'Lên đến 65h (ANC Tắt) / 45h (ANC Bật)' },
            { label: 'Thời gian sạc đầy', value: 'Khoảng 90 phút qua cổng Type-C' },
            { label: 'Sạc nhanh Fast-Fuel', value: '10 phút sạc = 6 giờ sử dụng' }
          ]
        },
        {
          group: 'Vật liệu & Kích thước',
          items: [
            { label: 'Khung thân', value: 'Nhôm Anodized & Hợp kim Magie' },
            { label: 'Chất liệu đệm tai', value: 'Memory foam bọc da Protein thoáng khí' },
            { label: 'Trọng lượng tịnh', value: '248g (Cực kỳ nhẹ)' },
            { label: 'Kháng nước / Mồ hôi', value: 'Chuẩn chống nước IPX4' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x Thiết bị ${product.title}`, quantity: '1 chiếc', note: 'Nguyên seal kèm tem chống giả' },
        { name: '1x Hộp đựng bảo vệ cao cấp chống va đập (Travel Case)', quantity: '1 chiếc', note: 'Khóa kéo kim loại' },
        { name: '1x Cáp sạc bện dù bền bỉ USB-C sang USB-C 1.2m', quantity: '1 sợi', note: 'Chuẩn sạc nhanh PD' },
        { name: '1x Cáp âm thanh 3.5mm mạ vàng 24K truyền tín hiệu lossless', quantity: '1 sợi', note: 'Chống gãy gập' },
        { name: '1x Đầu chuyển Adapter âm thanh trên máy bay (Airplane Adapter)', quantity: '1 chiếc' },
        { name: '1x Sách hướng dẫn sử dụng & Thẻ bảo hành chính hãng 24T', quantity: '1 bộ' }
      ],
      warrantyHighlights: [
        'Bảo hành chính hãng 24 tháng theo mã số Serial / Tem QR điện tử',
        'Chính sách 1 đổi 1 trong 30 ngày nếu phát sinh lỗi phần cứng từ nhà sản xuất',
        'Hỗ trợ kỹ thuật trọn đời & nâng cấp firmware định kỳ qua ứng dụng VoltMart Connect',
        'Miễn phí vận chuyển hai chiều khi gửi bảo hành trên toàn quốc'
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
      tagline: 'Hiệu Năng Làm Việc Đột Phá & Chuẩn Mực Công Thái Học Chuyên Nghiệp',
      highlights: [
        {
          icon: 'cpu',
          title: 'Hiệu Suất Phản Hồi 8.000Hz',
          description: 'Tốc độ polling rate siêu tốc xử lý tín hiệu chuẩn mili-giây, độ trễ tiệm cận 0 cho công việc và tác vụ chuyên sâu.'
        },
        {
          icon: 'sparkles',
          title: 'Chất Liệu Cao Cấp CNC Anodized',
          description: 'Gia công từ hợp kim nguyên khối xử lý bề mặt nhám mờ sang trọng, chống bám vân tay và mồ hôi tối đa.'
        },
        {
          icon: 'feather',
          title: 'Công Thái Học Bảo Vệ Cổ Tay',
          description: 'Góc nghiêng khoa học nghiên cứu bởi chuyên gia công thái học giúp giảm 40% áp lực khớp cổ tay khi dùng lâu.'
        },
        {
          icon: 'zap',
          title: '3 Chế Độ Kết Nối Tri-Mode',
          description: 'Linh hoạt giữa Bluetooth 5.3, không dây 2.4GHz không độ trễ và cáp bện dù Type-C tháo rời tiện lợi.'
        }
      ],
      narrativeParagraphs: [
        `Nâng tầm không gian làm việc chuyên nghiệp với ${product.title}. Thiết kế tối giản tinh tế nhưng ẩn chứa sức mạnh phần cứng tối tân, thiết bị đáp ứng trọn vẹn cả nhu cầu sáng tạo nội dung, lập trình chuyên nghiệp lẫn giải trí đỉnh cao.`,
        'Mỗi phím bấm và bề mặt tiếp xúc được tối ưu hóa đến từng micromet, mang lại cảm giác gõ và di chuyển đầm chắc, êm ái và đạt chuẩn âm thanh thock trầm ấm mà không gây ồn ào ảnh hưởng tới đồng nghiệp xung quanh.',
        'Sản phẩm trải qua hơn 50 bài kiểm tra độ bền áp lực công nghiệp tại phòng lab VoltMart, cam kết tuổi thọ vận hành bền bỉ trên 80 triệu lần nhấn.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
          title: 'Thiết kế tối giản cho bàn làm việc hiện đại',
          caption: 'Hòa quyện hoàn hảo vào không gian setup tối giản minimalist hoặc công nghệ cao.'
        },
        {
          url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
          title: 'Góc nghiêng công thái học chuẩn chỉ',
          caption: 'Bố trí độ dốc khoa học giúp nâng đỡ khớp cổ tay và cơ bắp cẳng tay thư thái.'
        },
        {
          url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
          title: 'Tương thích đa nền tảng MacOS, Windows, Linux, iPadOS',
          caption: 'Gạt công tắc chuyển đổi layout tức thì giữa phím Command (Mac) và Win key tiện lợi.'
        }
      ],
      specGroups: [
        {
          group: 'Thông số Kỹ thuật & Hiệu năng',
          items: [
            { label: 'Cảm biến / Switch', value: 'Cảm biến quang học chính xác cao / Switch cơ học bôi trơn sẵn' },
            { label: 'Tần số phản hồi (Polling Rate)', value: '1,000Hz - 8,000Hz siêu tốc' },
            { label: 'Độ phân giải DPI / Độ nhạy', value: 'Tùy chỉnh 100 - 26,000 DPI' },
            { label: 'Tuổi thọ linh kiện', value: 'Độ bền trên 80,000,000 chu kỳ hoạt động' }
          ]
        },
        {
          group: 'Khả năng Kết nối & Hệ thống',
          items: [
            { label: 'Chế độ kết nối', value: 'Tri-Mode: 2.4G Wireless, Bluetooth 5.3 & Dây Type-C' },
            { label: 'Bộ thu USB Dongle', value: 'USB-A & Đầu chuyển Type-C kèm theo' },
            { label: 'Hệ điều hành tương thích', value: 'Windows 10/11, macOS 12+, iOS, Android, Linux' },
            { label: 'Bộ nhớ lưu trữ hồ sơ', value: 'Lưu onboard 5 Profile cấu hình tùy biến' }
          ]
        },
        {
          group: 'Năng lượng & Trọng lượng',
          items: [
            { label: 'Dung lượng Pin', value: 'Pin sạc lithium 4,000mAh' },
            { label: 'Thời lượng pin liên tục', value: 'Lên đến 200 giờ (Tắt LED) / 72 giờ (Bật LED)' },
            { label: 'Cổng nạp điện', value: 'Type-C Fast Charge 5V/1A' },
            { label: 'Trọng lượng', value: 'Cân đối chuẩn công thái học 680g' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x Thiết bị ${product.title}`, quantity: '1 chiếc', note: 'Chính hãng nguyên seal' },
        { name: '1x Đầu thu USB 2.4GHz Nano Receiver thế hệ mới', quantity: '1 chiếc', note: 'Độ trễ 1ms' },
        { name: '1x Cáp bện dù siêu mềm Type-C sang Type-A 1.8m', quantity: '1 sợi', note: 'Chống nhiễu từ' },
        { name: '1x Bộ chuyển đổi Adapter Type-C sang Type-A', quantity: '1 chiếc' },
        { name: '1x Dụng cụ gắp phụ kiện & Vệ sinh chuyên dụng', quantity: '1 chiếc' },
        { name: '1x Sách hướng dẫn sử dụng & Thẻ bảo hành điện tử 24 tháng', quantity: '1 bộ' }
      ],
      warrantyHighlights: [
        'Bảo hành chính hãng 24 tháng toàn diện phần cứng',
        '1 đổi 1 mới 100% trong 30 ngày nếu phát sinh bất kỳ lỗi kỹ thuật nào',
        'Hỗ trợ cài đặt phần mềm và driver tùy biến phím trọn đời sản phẩm',
        'Kích hoạt bảo hành dễ dàng qua quét mã QR trên bao bì hộp'
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
      tagline: 'Trợ Lý Sức Khỏe Toàn Diện & Đột Phá Thiết Kế Thể Thao Thời Thượng',
      highlights: [
        {
          icon: 'sparkles',
          title: 'Màn Hình AMOLED Ultra 1.43 Inch',
          description: 'Độ sáng đỉnh 1.000 nits, kính cường lực Sapphire chống trầy xước và hiển thị sắc nét dưới ánh nắng gắt.'
        },
        {
          icon: 'shield',
          title: 'Cảm Biến Sinh Học Bio-Sensor 5.0',
          description: 'Theo dõi nhịp tim 24/7, SpO2 nồng độ oxy trong máu, mức độ căng thẳng Stress và chu kỳ giấc ngủ REM chuẩn y khoa.'
        },
        {
          icon: 'battery',
          title: 'Thời Lượng Pin 14 Ngày Vượt Trội',
          description: 'Thuật toán tiết kiệm năng lượng thông minh kết hợp sạc không dây nam châm từ tính tiện lợi.'
        },
        {
          icon: 'zap',
          title: 'Chống Nước 5ATM & GPS Độc Lập',
          description: 'Thoải mái bơi lội, lặn biển ở độ sâu 50 mét và ghi lại quãng đường chạy bộ chính xác mà không cần mang theo điện thoại.'
        }
      ],
      narrativeParagraphs: [
        `${product.title} là người bạn đồng hành hoàn hảo cho phong cách sống năng động hiện đại. Được chế tác với viền titan siêu nhẹ và mặt kính Sapphire vát cong 3D, thiết bị toát lên vẻ đẹp thanh lịch đẳng cấp trên cổ tay bạn.`,
        'Với hơn 120 chế độ luyện tập thể thao từ chạy bộ, bơi lội đến leo núi, thiết bị tự động nhận diện bài tập và đưa ra gợi ý phục hồi thể lực khoa học, giúp bạn chạm đến các mục tiêu sức khỏe bền vững.',
        'Khả năng đồng bộ thông minh hiển thị tin nhắn, cuộc gọi hai chiều qua loa và mic chống ồn tích hợp, quản lý thông báo mọi lúc mọi nơi mà không bỏ lỡ thông tin quan trọng.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
          title: 'Mặt kính Sapphire chống xước hoàn hảo',
          caption: 'Kính cường lực tinh thể sapphire độ cứng 9H chống trầy xước tối đa trong mọi hoạt động.'
        },
        {
          url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1200&q=80',
          title: 'Cảm biến nhịp tim & sinh trắc học quang học thế hệ mới',
          caption: 'Bố trí 8 cụm đi-ốt quang học dưới đáy gốm thân thiện với làn da người sử dụng.'
        },
        {
          url: 'https://images.unsplash.com/photo-1510519138197-06b8628c6711?auto=format&fit=crop&w=1200&q=80',
          title: 'Dây đeo Silicon kháng khuẩn tháo lắp nhanh Quick-Release',
          caption: 'Dễ dàng thay đổi nhiều phong cách dây da, kim loại hoặc dù thể thao theo cá tính.'
        }
      ],
      specGroups: [
        {
          group: 'Màn hình & Hiển thị',
          items: [
            { label: 'Công nghệ màn hình', value: 'AMOLED True Color 1.43 inch' },
            { label: 'Độ phân giải', value: '466 x 466 pixels (Mật độ 326 PPI)' },
            { label: 'Độ sáng tối đa', value: '1,000 nits Tự động điều chỉnh theo môi trường' },
            { label: 'Tính năng Always-On Display', value: 'Hỗ trợ hơn 100+ mặt đồng hồ AOD' }
          ]
        },
        {
          group: 'Cảm biến Sức khỏe & Thể thao',
          items: [
            { label: 'Cảm biến nhịp tim quang học', value: 'Bio-Tracker PPG 5.0 đo liên tục 24h' },
            { label: 'Cảm biến Oxy trong máu (SpO2)', value: 'Đo chính xác theo thời gian thực' },
            { label: 'Hệ thống định vị vệ tinh', value: 'Đa băng tần GNSS: GPS, GLONASS, Galileo, BeiDou' },
            { label: 'Chỉ số chống nước', value: '5ATM (Chịu áp lực nước ở độ sâu 50m)' }
          ]
        },
        {
          group: 'Pin & Kết nối',
          items: [
            { label: 'Thời lượng pin tiêu chuẩn', value: 'Lên đến 14 ngày sử dụng bình thường' },
            { label: 'Thời lượng chế độ GPS liên tục', value: 'Khoảng 32 giờ định vị chính xác' },
            { label: 'Phương thức sạc', value: 'Đế sạc nam châm hít từ tính không dây' },
            { label: 'Kết nối không dây', value: 'Bluetooth 5.3 BLE, Wi-Fi 2.4GHz, NFC một chạm' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x Đồng hồ thông minh ${product.title}`, quantity: '1 chiếc', note: 'Chính hãng nguyên seal' },
        { name: '1x Dây đeo thể thao kháng khuẩn fluoroelastomer cao cấp', quantity: '1 bộ' },
        { name: '1x Cáp sạc từ tính nam châm chuẩn USB', quantity: '1 sợi' },
        { name: '1x Miếng dán bảo vệ màn hình kháng vân tay', quantity: '1 miếng' },
        { name: '1x Sách hướng dẫn sử dụng & Thẻ bảo hành chính hãng 24 tháng', quantity: '1 bộ' }
      ],
      warrantyHighlights: [
        'Bảo hành chính hãng 24 tháng trên toàn hệ thống VoltMart Flagship',
        'Chính sách 1 đổi 1 miễn phí trong 30 ngày đầu tiên nếu lỗi kỹ thuật phần cứng',
        'Hỗ trợ thay thế linh kiện chính hãng và bảo dưỡng pin định kỳ',
        'Tổng đài hỗ trợ kỹ thuật viên đồng hành 24/7'
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
      tagline: 'Vũ Khí Chiến Game Chuyên Nghiệp & Kiểm Soát Cảm Giác Thao Tác Tuyệt Đỉnh',
      highlights: [
        {
          icon: 'zap',
          title: 'Cần Analog Cảm Ứng Từ Hall Effect',
          description: 'Triệt tiêu hoàn toàn hiện tượng trôi cần (drift) với độ bền cơ học trên 5 triệu chu kỳ xoay.'
        },
        {
          icon: 'cpu',
          title: 'Trigger Khóa Hành Trình Kép',
          description: 'Tùy biến hành trình cò phím từ tuyến tính sang click chuột tức thì chỉ bằng một gạt tay.'
        },
        {
          icon: 'sparkles',
          title: 'Rung Phản Hồi Xúc Giác Haptic Rung Kép',
          description: 'Mô phỏng chân thực từng va chạm, tiếng nổ, lực ma sát lốp xe cho trải nghiệm đắm chìm tuyệt đối.'
        },
        {
          icon: 'wifi',
          title: 'Tần Số Quét 1000Hz Cực Kì Ổn Định',
          description: 'Độ trễ tín hiệu dưới 1ms qua kết nối không dây 2.4GHz không bị nhiễu sóng.'
        }
      ],
      narrativeParagraphs: [
        `Khẳng định phong độ đỉnh cao trong mọi đấu trường eSports với ${product.title}. Thiết kế báng cầm phủ vân cao su chống trượt giúp game thủ giữ vững cảm giác cầm nắm chắc chắn kể cả trong những trận đấu kịch tính kéo dài.`,
        'Trang bị 4 phím Macro cơ học phía sau lưng có thể gán phím hoặc tạo chuỗi combo phức tạp tức thì mà không cần cài đặt phần mềm rườm rà. Tương thích toàn diện từ PC Windows, Steam Deck, Nintendo Switch đến smartphone Android và iOS.',
        'Mỗi linh kiện đều được tuyển chọn kỹ lưỡng, mang lại trải nghiệm thi đấu chuyên nghiệp đạt tiêu chuẩn các giải đấu eSports hàng đầu thế giới.'
      ],
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=80',
          title: 'Thiết kế báng cầm công thái học chống mỏi tay',
          caption: 'Bề mặt hoa văn vi mô gia tăng độ bám và thoát mồ hôi tay tuyệt vời.'
        },
        {
          url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
          title: 'Hệ thống đèn LED RGB đa sắc tùy biến hiệu ứng',
          caption: 'Đồng bộ ánh sáng theo nhịp điệu trận chiến và âm thanh trong game.'
        },
        {
          url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
          title: 'Cần Analog Hall Effect chống trôi tuyệt đối',
          caption: 'Không tiếp điểm cơ học, không mài mòn, giữ độ chính xác tuyệt đối suốt nhiều năm sử dụng.'
        }
      ],
      specGroups: [
        {
          group: 'Hệ thống Nút bấm & Cảm biến',
          items: [
            { label: 'Cần Analog (Thumbstick)', value: 'Công nghệ cảm ứng từ Hall Effect chống trôi' },
            { label: 'Cò Trigger (LT/RT)', value: 'Hall Magnetic Linear Trigger có công tắc khóa 2 nấc' },
            { label: 'Cụm phím D-Pad & ABXY', value: 'Microswitch cơ học tuổi thọ 10 triệu lượt nhấn' },
            { label: 'Phím tùy biến lưng (Back paddles)', value: '4 phím Macro gán lệnh và combo độc lập' }
          ]
        },
        {
          group: 'Khả năng Kết nối & Tương thích',
          items: [
            { label: 'Giao thức kết nối', value: 'Không dây 2.4GHz, Bluetooth 5.2, Cáp USB-C' },
            { label: 'Thiết bị hỗ trợ', value: 'PC (Windows 10/11), Steam Deck, Switch, Android, iOS' },
            { label: 'Tần số gửi gói tin (Polling Rate)', value: '1,000Hz (Có dây & 2.4GHz) / 250Hz (Bluetooth)' }
          ]
        },
        {
          group: 'Pin & Kích thước',
          items: [
            { label: 'Dung lượng pin', value: '1,200 mAh Lithium-ion dung lượng cao' },
            { label: 'Thời lượng chơi liên tục', value: 'Lên đến 25-30 giờ sau mỗi lần sạc đầy' },
            { label: 'Trọng lượng', value: '265g (Tối ưu cân bằng trọng tâm)' }
          ]
        }
      ],
      inTheBox: [
        { name: `1x Tay cầm ${product.title}`, quantity: '1 chiếc', note: 'Chính hãng nguyên seal' },
        { name: '1x USB Receiver không dây 2.4GHz độ trễ siêu thấp', quantity: '1 chiếc' },
        { name: '1x Cáp sạc bện dù chống đứt Type-C dài 2 mét', quantity: '1 sợi' },
        { name: '2x Núm bọc cần Analog silicon chống trượt tặng kèm', quantity: '2 cặp' },
        { name: '1x Thẻ bảo hành điện tử chính hãng 24 tháng & Sách HDSD', quantity: '1 bộ' }
      ],
      warrantyHighlights: [
        'Bảo hành chính hãng 24 tháng toàn diện, cam kết không lo lỗi trôi cần',
        'Đổi mới ngay lập tức trong 30 ngày nếu phát hiện lỗi từ nhà máy',
        'Hỗ trợ cập nhật firmware và phần mềm căn chỉnh deadzone miễn phí',
        'Phục vụ hỗ trợ người dùng chu đáo qua kênh chat trực tiếp'
      ]
    };
  }

  // Default Fallback Rich Info (Electronics / Tech)
  return {
    tagline: 'Kỹ Thuật Chế Tác Đỉnh Cao & Tiêu Chuẩn Công Nghệ Đột Phá',
    highlights: [
      {
        icon: 'sparkles',
        title: 'Chất Lượng Hoàn Thiện Flagship',
        description: 'Vật liệu cao cấp kiểm định nghiêm ngặt, thiết kế tinh xảo theo tiêu chuẩn công nghiệp hiện đại.'
      },
      {
        icon: 'cpu',
        title: 'Vi Xử Lý Thế Hệ Mới',
        description: 'Tối ưu hóa hiệu năng, vận hành mượt mà ổn định và tiết kiệm năng lượng tối đa.'
      },
      {
        icon: 'shield',
        title: 'Bảo Hành Toàn Diện 24 Tháng',
        description: 'Chính sách 1 đổi 1 trong 30 ngày đầu, bảo hành điện tử chính hãng tại hệ thống VoltMart Flagship.'
      },
      {
        icon: 'zap',
        title: 'Chuẩn Kết Nối Tương Thích Cao',
        description: 'Dễ dàng đồng bộ cùng mọi hệ sinh thái thiết bị di động, laptop và máy tính cá nhân.'
      }
    ],
    narrativeParagraphs: [
      `${product.title} là sản phẩm công nghệ cao cấp được sản xuất theo dây chuyền đạt chuẩn quốc tế. Từng đường nét, khớp nối và bề mặt hoàn thiện đều được gia công tỉ mỉ để đáp ứng nhu cầu khắt khe của người dùng hiện đại.`,
      'Trang bị công nghệ vi xử lý tiên tiến giúp thiết bị phản hồi nhanh chóng, tiết kiệm điện năng tiêu thụ và duy trì hiệu suất hoạt động bền bỉ, ổn định trong suốt thời gian dài sử dụng liên tục.',
      'Sản phẩm được phân phối chính hãng bởi VoltMart Official Store với đầy đủ chứng nhận chất lượng CE, FCC, RoHS, tem chống hàng giả và chế độ bảo hành 1 đổi 1 uy tín.'
    ],
    gallery: [
      {
        url: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
        title: 'Góc nhìn cận cảnh chi tiết thiết kế',
        caption: 'Bề mặt phủ sơn tĩnh điện nano chống trầy xước và bám bụi bẩn hiệu quả.'
      },
      {
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
        title: 'Cổng kết nối đa năng tiện lợi',
        caption: 'Hỗ trợ chuẩn kết nối tiêu chuẩn hiện đại, cắm là chạy Plug-and-Play tức thì.'
      },
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
        title: 'Trải nghiệm không gian làm việc chuyên nghiệp',
        caption: 'Nâng tầm góc làm việc hiện đại với phong cách công nghệ tối giản thanh lịch.'
      }
    ],
    specGroups: [
      {
        group: 'Thông số Kỹ thuật Cốt lõi',
        items: [
          { label: 'Thương hiệu & Model', value: `VoltMart ${product.title}` },
          { label: 'Mã SKU', value: product.sku || 'VLT-PRO-SERIES' },
          { label: 'Chứng nhận tiêu chuẩn', value: 'CE, FCC, RoHS, ISO 9001' },
          { label: 'Tình trạng tồn kho', value: `${product.stock} sản phẩm sẵn sàng giao ngay` }
        ]
      },
      {
        group: 'Vật liệu & Thiết kế',
        items: [
          { label: 'Chất liệu vỏ ngoài', value: 'Hợp kim nhôm Anodized cao cấp & Polycarbonate chịu nhiệt' },
          { label: 'Màu sắc hoàn thiện', value: 'Matte Black / Space Gray / Titanium' },
          { label: 'Độ bền chu kỳ', value: 'Đạt kiểm nghiệm độ bền trên 100,000 giờ hoạt động' }
        ]
      },
      {
        group: 'Bảo hành & Hỗ trợ',
        items: [
          { label: 'Thời hạn bảo hành', value: '24 Tháng (1 đổi 1 trong 30 ngày)' },
          { label: 'Hình thức bảo hành', value: 'Bảo hành điện tử theo Serial Number' },
          { label: 'Đơn vị phân phối', value: 'VoltMart Flagship Store Official' }
        ]
      }
    ],
    inTheBox: [
      { name: `1x Sản phẩm ${product.title}`, quantity: '1 chiếc', note: 'Nguyên seal chính hãng' },
      { name: '1x Cáp kết nối tín hiệu chuẩn Type-C bọc dù cao cấp', quantity: '1 sợi' },
      { name: '1x Bộ phụ kiện chuyển đổi & lắp đặt', quantity: '1 bộ' },
      { name: '1x Sách hướng dẫn sử dụng tiếng Việt & tiếng Anh', quantity: '1 cuốn' },
      { name: '1x Thẻ bảo hành điện tử VoltMart chính hãng 24 tháng', quantity: '1 chiếc' }
    ],
    warrantyHighlights: [
      'Bảo hành chính hãng 24 tháng trên toàn quốc',
      'Đổi trả 1-đổi-1 miễn phí trong 30 ngày nếu có lỗi từ nhà sản xuất',
      'Miễn phí chi phí vận chuyển bảo hành tận nơi',
      'Đội ngũ kỹ thuật viên hỗ trợ tư vấn 24/7'
    ]
  };
}
