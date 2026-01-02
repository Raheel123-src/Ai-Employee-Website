import ScrollStack, { ScrollStackItem } from '@/components/organisms/ScrollStack/ScrollStack';

const WhatAllTheyDo = () => {
    return (
        <section className="what-all-they-do" id="what-all-they-do">
            <h2>What All They Do?</h2>
            <p className="intro">
                AI Employees don't just "answer chats" — they actually do work across your tools and teams.
            </p>
            <ScrollStack className="what-stack" itemDistance={80} itemScale={0.04} itemStackDistance={30} stackPosition="15%" scaleEndPosition="5%" baseScale={0.9} rotationAmount={5} blurAmount={5} useWindowScroll={true}>
                <ScrollStackItem>
                    <h3>Handle all your communication & follow-ups</h3>
                    <ul>
                        <li>Read and reply to emails in Gmail / Outlook</li>
                        <li>Draft intros, follow-ups, nudges and reminders</li>
                        <li>Maintain a follow-up database so no lead, candidate or task is forgotten</li>
                        <li>Send updates to managers on what's pending, what's done</li>
                    </ul>
                </ScrollStackItem>
                <ScrollStackItem>
                    <h3>Maintain lead lists, candidate lists, training progress, payment trackers and more</h3>
                    <ul>
                        <li>Track pipelines, candidates, onboarding, payments</li>
                        <li>Generate reports and dashboards automatically</li>
                    </ul>
                </ScrollStackItem>
                <ScrollStackItem>
                    <h3>Work with your documents, SOPs & images</h3>
                    <ul>
                        <li>Read docs, PDFs and images to extract key info</li>
                        <li>Check work against your SOPs and checklists</li>
                        <li>Flag missing fields, mismatches, policy violations or wrong formats</li>
                        <li>Compare JD vs CV, PO vs invoice, plan vs actual, etc.</li>
                    </ul>
                </ScrollStackItem>
                <ScrollStackItem>
                    <h3>Research, think and create</h3>
                    <ul>
                        <li>Search the internet where allowed to gather context, trends and references</li>
                        <li>Draft content – emails, reports, JDs, job posts, learning content, social copy</li>
                        <li>Generate images for simple creatives, explainers and learning assets</li>
                        <li>Suggest new ideas for campaigns, processes, experiments and improvements</li>
                    </ul>
                </ScrollStackItem>
                <ScrollStackItem>
                    <h3>Report, summarise and keep everyone in sync</h3>
                    <ul>
                        <li>Generate daily / weekly summaries for Sales, HR, Ops, Finance, L&amp;D, IT</li>
                        <li>Highlight risks, delays and priorities</li>
                        <li>Create simple dashboards in Sheets that your team can actually use</li>
                    </ul>
                </ScrollStackItem>
            </ScrollStack>
        </section>
    );
};

export default WhatAllTheyDo;
