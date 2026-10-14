import type {
  PolicyDocument,
  PopularQuestion,
  RecentQuestion,
  UserProfile,
} from '@/types';

export const userProfile: UserProfile = {
  name: 'Alex Morgan',
  role: 'Senior Software Engineer',
  initials: 'AM',
};

export const stats = {
  availablePolicies: 24,
  supportedRegions: 3,
  questionsAsked: 47,
  recentSearches: 12,
};

export const regions = ['India', 'United States', 'United Kingdom'] as const;

export const popularQuestions: PopularQuestion[] = [
  { id: 'pq1', question: 'How many annual leave days do I get?', category: 'Leave Policy' },
  { id: 'pq2', question: 'What is the parental leave policy?', category: 'Parental Leave' },
  { id: 'pq3', question: 'How do I claim medical benefits?', category: 'Health Benefits' },
  { id: 'pq4', question: 'What are the company holidays?', category: 'Holiday Calendar' },
];

export const recentlyViewedPolicies: PolicyDocument[] = [
  {
    id: 'rv1',
    title: 'Employee Handbook',
    category: 'General',
    region: 'Global',
    lastUpdated: '2026-09-15',
    icon: 'BookOpen',
    summary: 'Comprehensive guide covering company values, culture, and general policies.',
    content:
      'The Employee Handbook covers company values, code of conduct, workplace culture, and general employment policies. It serves as the primary reference for all employees regarding expectations and company standards.',
  },
  {
    id: 'rv2',
    title: 'Annual Leave Policy',
    category: 'Leave Policy',
    region: 'India',
    lastUpdated: '2026-08-20',
    icon: 'CalendarDays',
    summary: 'Annual leave entitlements, accrual, and request procedures for India.',
    content:
      'Employees in India are entitled to 20 annual leave days per calendar year. Leaves accrue at 1.67 days per month. Unused leave can be carried forward up to 30 days. Requests must be submitted at least 5 days in advance through the HR portal.',
  },
  {
    id: 'rv3',
    title: 'Medical and Health Benefits',
    category: 'Health Benefits',
    region: 'United States',
    lastUpdated: '2026-07-10',
    icon: 'HeartPulse',
    summary: 'Medical, dental, and vision insurance plans for US employees.',
    content:
      'US employees receive comprehensive medical, dental, and vision coverage. The company covers 80% of premiums for employees and 50% for dependents. Coverage begins on the first day of the month following hire. Claims can be submitted through the benefits portal or the mobile app.',
  },
];

export const policyDocuments: PolicyDocument[] = [
  {
    id: 'doc1',
    title: 'Employee Handbook',
    category: 'General',
    region: 'Global',
    lastUpdated: '2026-09-15',
    icon: 'BookOpen',
    summary: 'Comprehensive guide covering company values, culture, and general policies.',
    content:
      'The Employee Handbook covers company values, code of conduct, workplace culture, and general employment policies. It serves as the primary reference for all employees regarding expectations and company standards. Sections include: Company Mission & Values, Workplace Conduct, Equal Opportunity Policy, Anti-Harassment Guidelines, Dress Code, Remote Work Guidelines, and Performance Expectations.',
  },
  {
    id: 'doc2',
    title: 'Annual Leave Policy',
    category: 'Leave Policy',
    region: 'India',
    lastUpdated: '2026-08-20',
    icon: 'CalendarDays',
    summary: 'Annual leave entitlements, accrual, and request procedures for India.',
    content:
      'Employees in India are entitled to 20 annual leave days per calendar year. Leaves accrue at 1.67 days per month. Unused leave can be carried forward up to 30 days. Requests must be submitted at least 5 days in advance through the HR portal. Sick leave (12 days) and casual leave (10 days) are tracked separately.',
  },
  {
    id: 'doc3',
    title: 'Medical and Health Benefits',
    category: 'Health Benefits',
    region: 'United States',
    lastUpdated: '2026-07-10',
    icon: 'HeartPulse',
    summary: 'Medical, dental, and vision insurance plans for US employees.',
    content:
      'US employees receive comprehensive medical, dental, and vision coverage. The company covers 80% of premiums for employees and 50% for dependents. Coverage begins on the first day of the month following hire. Claims can be submitted through the benefits portal or the mobile app. FSA and HSA options are available.',
  },
  {
    id: 'doc4',
    title: 'Parental Leave Policy',
    category: 'Parental Leave',
    region: 'United Kingdom',
    lastUpdated: '2026-06-05',
    icon: 'Baby',
    summary: 'Maternity, paternity, and shared parental leave for UK employees.',
    content:
      'UK employees are entitled to 52 weeks of maternity leave (39 weeks paid). Paternity leave is 2 weeks paid. Shared Parental Leave allows parents to share up to 50 weeks of leave. Eligibility requires 26 weeks of continuous employment by the 15th week before the expected due date.',
  },
  {
    id: 'doc5',
    title: 'Code of Conduct',
    category: 'General',
    region: 'Global',
    lastUpdated: '2026-09-01',
    icon: 'Scale',
    summary: 'Ethical standards and professional conduct expectations for all employees.',
    content:
      'The Code of Conduct outlines the ethical standards and professional behavior expected of all employees. It covers conflicts of interest, confidentiality, anti-corruption, data protection, and reporting mechanisms. Violations may result in disciplinary action up to and including termination.',
  },
  {
    id: 'doc6',
    title: 'Holiday Calendar',
    category: 'Holiday Calendar',
    region: 'India',
    lastUpdated: '2026-01-05',
    icon: 'Calendar',
    summary: 'List of company-observed holidays for India in 2026.',
    content:
      'India holiday calendar includes: Republic Day (Jan 26), Holi (Mar 14), Good Friday (Apr 18), Independence Day (Aug 15), Gandhi Jayanti (Oct 2), Dussehra (Oct 21), Diwali (Oct 31), Christmas (Dec 25), and 2 optional holidays chosen from a regional list. Total: 10 fixed holidays + 2 optional.',
  },
  {
    id: 'doc7',
    title: 'Annual Leave Policy - US',
    category: 'Leave Policy',
    region: 'United States',
    lastUpdated: '2026-08-01',
    icon: 'CalendarDays',
    summary: 'PTO accrual and request procedures for US employees.',
    content:
      'US employees accrue Paid Time Off (PTO) based on tenure: 0-2 years = 15 days, 3-5 years = 20 days, 6+ years = 25 days. PTO accrues per pay period and rolls over up to 5 days per year. Requests should be submitted 7 days in advance via the HR portal.',
  },
  {
    id: 'doc8',
    title: 'Annual Leave Policy - UK',
    category: 'Leave Policy',
    region: 'United Kingdom',
    lastUpdated: '2026-08-01',
    icon: 'CalendarDays',
    summary: 'Statutory annual leave entitlement for UK employees.',
    content:
      'UK employees are entitled to 28 days of annual leave (including bank holidays) per leave year (January to December). Unused leave can be carried forward up to 8 days with manager approval. Requests must be submitted 10 days in advance.',
  },
  {
    id: 'doc9',
    title: 'Health Benefits - UK',
    category: 'Health Benefits',
    region: 'United Kingdom',
    lastUpdated: '2026-06-15',
    icon: 'HeartPulse',
    summary: 'Private health insurance and wellness benefits for UK employees.',
    content:
      'UK employees receive private health insurance through Bupa, covering inpatient and outpatient care. The company pays 100% of the employee premium. Dental and vision coverage is available as an optional add-on. Employees also have access to a wellness program including gym subsidies and mental health support.',
  },
  {
    id: 'doc10',
    title: 'Parental Leave Policy - India',
    category: 'Parental Leave',
    region: 'India',
    lastUpdated: '2026-05-20',
    icon: 'Baby',
    summary: 'Maternity and paternity leave entitlements for India.',
    content:
      'India: Maternity leave is 26 weeks (paid) for the first two children and 12 weeks for subsequent children. Paternity leave is 15 days (paid). Adoption leave is 12 weeks. Eligibility requires 80 days of service in the preceding 12 months.',
  },
  {
    id: 'doc11',
    title: 'Parental Leave Policy - US',
    category: 'Parental Leave',
    region: 'United States',
    lastUpdated: '2026-05-20',
    icon: 'Baby',
    summary: 'Parental leave benefits for US employees under FMLA and company policy.',
    content:
      'US: Eligible employees receive 12 weeks of unpaid leave under FMLA. The company supplements with 6 weeks of paid parental leave for birth mothers and 4 weeks for non-birth parents. Benefits continue during leave. Eligibility requires 12 months and 1,250 hours of service.',
  },
  {
    id: 'doc12',
    title: 'Holiday Calendar - US',
    category: 'Holiday Calendar',
    region: 'United States',
    lastUpdated: '2026-01-05',
    icon: 'Calendar',
    summary: 'List of company-observed holidays for the US in 2026.',
    content:
      'US holiday calendar includes: New Year Day (Jan 1), MLK Day (Jan 19), Presidents Day (Feb 16), Memorial Day (May 25), Independence Day (Jul 3), Labor Day (Sep 7), Thanksgiving (Nov 26), Day after Thanksgiving (Nov 27), Christmas (Dec 25). Total: 9 holidays.',
  },
];

export const recentQuestions: RecentQuestion[] = [
  {
    id: 'rq1',
    question: 'How many annual leave days do I get in India?',
    region: 'India',
    category: 'Leave Policy',
    timestamp: '2026-10-11T14:30:00Z',
    answer:
      'Employees in India are entitled to 20 annual leave days per calendar year. Leaves accrue at 1.67 days per month. Unused leave can be carried forward up to 30 days.',
    sourceDocument: 'Annual Leave Policy',
  },
  {
    id: 'rq2',
    question: 'What is the parental leave policy in the UK?',
    region: 'United Kingdom',
    category: 'Parental Leave',
    timestamp: '2026-10-10T09:15:00Z',
    answer:
      'UK employees are entitled to 52 weeks of maternity leave (39 weeks paid). Paternity leave is 2 weeks paid. Shared Parental Leave allows parents to share up to 50 weeks of leave.',
    sourceDocument: 'Parental Leave Policy',
  },
  {
    id: 'rq3',
    question: 'How do I claim medical benefits in the US?',
    region: 'United States',
    category: 'Health Benefits',
    timestamp: '2026-10-09T16:45:00Z',
    answer:
      'US employees can submit claims through the benefits portal or the mobile app. The company covers 80% of premiums for employees and 50% for dependents. Coverage begins on the first day of the month following hire.',
    sourceDocument: 'Medical and Health Benefits',
  },
  {
    id: 'rq4',
    question: 'What are the company holidays in India?',
    region: 'India',
    category: 'Holiday Calendar',
    timestamp: '2026-10-08T11:00:00Z',
    answer:
      'India has 10 fixed holidays including Republic Day, Holi, Independence Day, Diwali, and Christmas, plus 2 optional holidays chosen from a regional list.',
    sourceDocument: 'Holiday Calendar',
  },
  {
    id: 'rq5',
    question: 'What is the code of conduct?',
    region: 'India',
    category: 'General',
    timestamp: '2026-10-07T13:20:00Z',
    answer:
      'The Code of Conduct outlines ethical standards and professional behavior expected of all employees. It covers conflicts of interest, confidentiality, anti-corruption, and data protection.',
    sourceDocument: 'Code of Conduct',
  },
];

export const suggestedQuestions = [
  'How many annual leave days do I get?',
  'What is the parental leave policy?',
  'How do I claim medical benefits?',
  'What are the company holidays?',
  'What is the dress code policy?',
  'How does the remote work policy work?',
];

export const categories = [
  'General',
  'Leave Policy',
  'Health Benefits',
  'Parental Leave',
  'Holiday Calendar',
];

// ===== Mock assistant response data =====
// Each entry maps a keyword pattern to an answer. This is intentionally simple
// so it can be replaced later with a real backend API call.

interface MockAnswer {
  keywords: string[];
  answer: string;
  sourceDocument?: string;
  category?: string;
}

export const mockAnswers: MockAnswer[] = [
  {
    keywords: ['annual leave', 'leave days', 'vacation', 'pto', 'paid time off'],
    answer:
      'Employees in India are entitled to 20 annual leave days per year. In the US, PTO ranges from 15 to 25 days based on tenure. In the UK, employees get 28 days (including bank holidays). Unused leave can be carried forward with limits that vary by region.',
    sourceDocument: 'Annual Leave Policy',
    category: 'Leave Policy',
  },
  {
    keywords: ['parental leave', 'maternity', 'paternity', 'parental'],
    answer:
      'Parental leave varies by region: India offers 26 weeks paid maternity and 15 days paternity. The UK provides 52 weeks maternity (39 paid) and 2 weeks paternity. The US offers 12 weeks FMLA with 6 weeks paid parental leave for birth mothers.',
    sourceDocument: 'Parental Leave Policy',
    category: 'Parental Leave',
  },
  {
    keywords: ['medical', 'health benefits', 'insurance', 'claim', 'dental', 'vision'],
    answer:
      'US employees receive medical, dental, and vision coverage with 80% of premiums paid by the company. UK employees get private health insurance through Bupa. Claims can be submitted through the benefits portal or mobile app.',
    sourceDocument: 'Medical and Health Benefits',
    category: 'Health Benefits',
  },
  {
    keywords: ['holiday', 'company holiday', 'public holiday'],
    answer:
      'Company holidays vary by region: India has 10 fixed + 2 optional holidays. The US observes 9 holidays including Thanksgiving and Independence Day. The UK observes 8 bank holidays. Please refer to the regional holiday calendar for exact dates.',
    sourceDocument: 'Holiday Calendar',
    category: 'Holiday Calendar',
  },
  {
    keywords: ['code of conduct', 'ethics', 'conduct', 'behavior'],
    answer:
      'The Code of Conduct outlines ethical standards covering conflicts of interest, confidentiality, anti-corruption, data protection, and professional behavior. Violations may result in disciplinary action up to and including termination.',
    sourceDocument: 'Code of Conduct',
    category: 'General',
  },
  {
    keywords: ['dress code', 'attire', 'appearance'],
    answer:
      'The company follows a business-casual dress code. On days with client meetings or formal events, business professional attire is expected. Remote employees should maintain a professional appearance during video calls.',
    sourceDocument: 'Employee Handbook',
    category: 'General',
  },
  {
    keywords: ['remote work', 'work from home', 'wfh'],
    answer:
      'Employees are eligible for hybrid work with up to 3 remote days per week, subject to manager approval. Fully remote roles require a formal arrangement. Employees must maintain a stable internet connection and be available during core hours.',
    sourceDocument: 'Employee Handbook',
    category: 'General',
  },
  {
    keywords: ['sick leave', 'sick', 'illness'],
    answer:
      'Sick leave policies vary by region: India provides 12 days of sick leave per year. The US allows sick time as part of PTO. UK employees can take statutory sick pay for up to 28 weeks. A medical certificate may be required for absences over 3 days.',
    sourceDocument: 'Annual Leave Policy',
    category: 'Leave Policy',
  },
];

export const fallbackResponse =
  "I'm sorry, I don't have a specific answer for that question in the current policy database. Please try rephrasing your question, or contact your HR representative directly for assistance.";
