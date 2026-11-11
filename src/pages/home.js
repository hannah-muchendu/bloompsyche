'use strict';
const content = require('../content');
const C = require('../components');
const { esc, paragraphs } = require('../util');

function emptyState(title, text, href, cta) {
  return `<div class="reveal card p-8 sm:p-10 text-center max-w-2xl mx-auto"><h3 class="font-display text-xl text-forest mb-2">${esc(title)}</h3><p class="text-sm text-ink-soft leading-relaxed mb-5">${esc(text)}</p><a href="${href}" class="btn-secondary btn-sm">${esc(cta)}</a></div>`;
}

module.exports = function home() {
  const stories = content.stories().slice(0, 3);
  const videos = content.videos().filter((v) => v.status !== 'unavailable' && (v.src || v.embedId)).slice(0, 2);
  const gallery = content.gallery().slice(0, 6);
  const gAll = content.gallery();

  // Founder profile: reads the same content/site.json fields as the About page (about.*, organisation.practitionerCredentials).
  // Nothing about Hannah is hardcoded here; empty values fall back to a neutral placeholder.
  const site = content.site();
  const about = site.about || {};
  const org = site.organisation || {};
  const hName = about.practitionerName || 'Hannah';
  const hBio = String(about.bio || '').trim();
  const hPortrait = about.portraitImage
    ? `<img src="${esc(about.portraitImage)}" alt="${esc(about.portraitAlt || `Portrait of ${hName}`)}" loading="lazy" data-fallback>`
    : `<div class="w-full h-full flex items-center justify-center bg-sand-deep"><svg class="w-16 h-16 sm:w-20 sm:h-20 text-sage" viewBox="0 0 400 400" fill="none" aria-hidden="true"><circle cx="200" cy="200" r="30" stroke="currentColor" stroke-width="1.2"/><circle cx="200" cy="200" r="60" stroke="currentColor" stroke-width="1" opacity="0.7"/><circle cx="200" cy="200" r="90" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg></div>`;

  const values = [
    ['Compassion and empathy', 'Everyone is met with kindness and without judgement, at their own pace.'],
    ['Psychological wellbeing', 'Understanding how thoughts, feelings, relationships and daily life shape the way we feel.'],
    ['Emotional health and resilience', 'Building steadier ways of coping, one small step at a time, with no pressure to be strong all the time.'],
    ['Personal growth and self-awareness', 'Making room to reflect, to learn about ourselves, and to grow in ways that feel true.'],
    ['Accessible mental health education', 'Clear, gentle information that helps people, and those who care about them, understand what they are going through.'],
    ['Supportive communities', 'Spaces where people feel understood, less alone and connected to others.'],
  ];

  const cares = [
    ['Mental Health and Psychological Wellbeing', 'Understanding how our thoughts, emotions, relationships and daily lives fit together, and caring for our minds as part of caring for ourselves.', false],
    ['Emotional Resilience and Personal Growth', 'Gentle, practical ways to build self-awareness and steadier coping, at a pace that feels right.', false],
    ['Grief and Bereavement Support', 'Making room for loss in all its forms, with the understanding that grief is personal and has no timetable.', true],
    ['Suicide Loss Awareness and Support', 'Compassionate understanding for people whose lives have been changed by a death by suicide, and for those who want to support them.', true],
    ['Mental Health Education and Community Awareness', 'Accessible information and shared spaces that reduce isolation and encourage open, kind conversations about mental health.', false],
  ];

  const pathways = [
    ['Talk with a psychologist', 'Individual support, at your pace, with no pressure and no timeline.', '/services', 'See support & services'],
    ['Read what others have shared', 'Written and video stories from people who understand, shared by choice.', '/stories', 'Read their stories'],
    ['Learn and find resources', 'Gentle guides for you, your family and the friends who want to help.', '/resources', 'Browse resources'],
    ['Share your own story', 'Only if and when you wish. Nothing is published without your consent and our review.', '/stories/share', 'Share a story'],
  ];

  const body = `
<!-- A. WELCOME (HERO) -->
<section class="scene scene-light scene-vignette relative pt-28 pb-20 sm:pt-40 sm:pb-28 md:pt-52 md:pb-36">
  <div class="glow-blob w-64 h-64 sm:w-96 sm:h-96 bg-clay/40 -right-16 -top-10 sm:-right-24 sm:-top-20" aria-hidden="true"></div>
  <div class="glow-blob w-56 h-56 sm:w-80 sm:h-80 bg-sage/40 -left-16 bottom-0 sm:-left-24" aria-hidden="true"></div>
  <div class="pointer-events-none absolute right-[-8rem] top-6 sm:-right-32 sm:top-10 md:right-[-4rem] md:top-0 opacity-60 sm:opacity-70" aria-hidden="true">
    <svg class="w-[22rem] h-[22rem] sm:w-[32rem] sm:h-[32rem] md:w-[42rem] md:h-[42rem] animate-breathe" viewBox="0 0 500 500" fill="none">
      <circle cx="150" cy="260" r="60" stroke="#2E4635" stroke-width="1" opacity="0.5"/><circle cx="150" cy="260" r="110" stroke="#4A6B57" stroke-width="1" opacity="0.4"/>
      <circle cx="150" cy="260" r="165" stroke="#97A98C" stroke-width="1" opacity="0.35"/><circle cx="150" cy="260" r="220" stroke="#C3CDB9" stroke-width="1" opacity="0.3"/>
      <circle cx="150" cy="260" r="270" stroke="#DDD5C0" stroke-width="1" opacity="0.25"/>
    </svg>
  </div>
  <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
    <p class="reveal eyebrow mb-5 sm:mb-6">Welcome to Bloom Psychology</p>
    <h1 class="reveal font-display text-[2.4rem] leading-[1.1] sm:text-5xl md:text-6xl sm:leading-[1.08] text-forest max-w-3xl">A space to grow, heal and find balance.</h1>
    <p class="reveal max-w-xl mt-6 sm:mt-8 text-base sm:text-lg text-ink-soft leading-relaxed">Welcome to Bloom Psychology. We believe that mental wellbeing is an essential part of living a fulfilling life. Through compassionate psychological support, education and meaningful connection, we aim to create a space where individuals feel heard, understood and supported through life&rsquo;s different experiences.</p>
    <p class="reveal max-w-xl mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">Whether you are seeking greater self-understanding, navigating emotional challenges, supporting someone you care about or finding your way through a difficult season, Bloom is here to encourage a journey towards greater wellbeing.</p>
    <div class="reveal mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
      <a href="/services" class="btn-primary w-full xs:w-auto">Find Support</a>
      <a href="#meet-hannah" class="btn-secondary w-full xs:w-auto">Meet ${esc(hName)}</a>
      <a href="/donate" class="inline-flex items-center justify-center gap-2 px-4 py-3 text-forest font-utility text-sm underline underline-offset-4 w-full xs:w-auto">Donate ${C.arrow}</a>
    </div>
    <p class="reveal mt-8 text-sm text-ink-soft max-w-md">If you are in crisis or in danger right now, <a href="/get-help-now" class="text-forest underline underline-offset-4">please see urgent support options</a>.</p>
  </div>
</section>

<!-- PHILOSOPHY BAND -->
<section class="reveal border-y border-sand-line bg-sand-deep/60">
  <div class="max-w-4xl mx-auto px-5 sm:px-6 md:px-10 py-14 sm:py-16 text-center">
    <div class="eyebrow-flanked mb-6"><span class="hairline"></span><span class="sprig"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M12 3c0 6-3 8-3 12a3 3 0 006 0c0-4-3-6-3-12z"/><path d="M12 10c-2 0-4 1-5 3M12 10c2 0 4 1 5 3"/></svg></span><span class="hairline"></span></div>
    <p class="signature-line text-xl sm:text-2xl md:text-3xl text-forest leading-relaxed">&ldquo;Wellbeing is not a destination. It is something we can learn about, tend to and grow, together.&rdquo;</p>
  </div>
</section>

<!-- B. ABOUT BLOOM PSYCHOLOGY -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-28" aria-labelledby="home-about">
  <div class="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
    <div class="reveal order-2 md:order-1 flex flex-col items-center">
      <div class="arch-frame w-56 sm:w-72 md:w-full max-w-sm"><div class="arch-frame__inner aspect-[3/4]"><img src="/images/mind-body-spirit.jpg" alt="Concentric rings illustrating the Mind, Body, Spirit framework: You, Wellness, Balance, Energy, Living" width="736" height="784" loading="lazy" data-fallback></div></div>
      <p class="plaque">The Mind &middot; Body &middot; Spirit Framework</p>
    </div>
    <div class="reveal order-1 md:order-2">
      <p class="eyebrow mb-4">About Bloom Psychology</p>
      <h2 id="home-about" class="font-display text-2xl sm:text-3xl md:text-4xl text-forest mb-5 sm:mb-6">Mental wellbeing matters at every stage of life.</h2>
      <p class="text-sm sm:text-base text-ink-soft leading-relaxed mb-4">Bloom Psychology is built on a simple belief: that caring for our minds and emotions is part of living well, whoever we are and whatever season of life we are in. We bring together psychological understanding, education and human connection, offered with warmth and without judgement.</p>
      <p class="text-sm sm:text-base text-ink-soft leading-relaxed mb-7">Wellbeing touches the whole person, so we look at sleep, routine, relationships and meaning as well as thoughts and feelings, always at a pace that is yours. Wellness here complements professional care. It never replaces it, and it is never a quick fix.</p>
      <a href="/approach" class="btn-secondary">See the full framework</a>
    </div>
  </div>
  <div class="mt-12 grid sm:grid-cols-3 gap-px bg-sand-line">
    ${values.map(([t, d]) => `<article class="reveal bg-sand p-7 sm:p-9"><h3 class="font-display text-lg sm:text-xl text-forest mb-3">${esc(t)}</h3><p class="text-sm text-ink-soft leading-relaxed">${esc(d)}</p></article>`).join('')}
  </div>
</section>

<!-- C. MEET HANNAH (reads content/site.json > about; placeholder when empty) -->
<section id="meet-hannah" class="bg-sand-deep/60 border-y border-sand-line py-16 sm:py-24 md:py-28" aria-labelledby="home-hannah">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-5 gap-8 sm:gap-14 items-center">
    <div class="md:col-span-2 reveal"><div class="arch-frame w-48 sm:w-64 md:w-full mx-auto max-w-xs"><div class="arch-frame__inner aspect-[4/5]">${hPortrait}</div></div>${about.portraitImage ? `<p class="plaque">${esc(hName)}</p>` : ''}</div>
    <div class="md:col-span-3 reveal text-center md:text-left">
      <p class="eyebrow mb-4 sm:mb-5">The founder</p>
      <h2 id="home-hannah" class="font-display text-2xl sm:text-3xl md:text-4xl text-forest leading-tight mb-5 sm:mb-6">Meet ${esc(hName)} &ndash; The heart behind Bloom.</h2>
      ${hBio
    ? `<div class="space-y-4 text-base sm:text-lg text-ink-soft leading-relaxed mb-4">${paragraphs(hBio)}</div>`
    : `<div class="space-y-4 text-base sm:text-lg text-ink-soft leading-relaxed mb-4"><p>${esc(hName)} is the founder of Bloom Psychology, and the heart behind everything Bloom hopes to be: a place where mental wellbeing is taken seriously, where people are listened to with care, and where support feels welcoming rather than intimidating.</p><p>A fuller introduction to ${esc(hName)}, including her background and what inspired her to begin Bloom, will be shared here soon.</p></div>`}
      ${org.practitionerCredentials ? `<p class="text-sm text-ink-soft leading-relaxed mb-4"><strong class="text-forest">Qualifications:</strong> ${esc(org.practitionerCredentials)}</p>` : ''}
      <div class="mt-6"><a href="/about" class="btn-secondary">Learn more about ${esc(hName)}</a></div>
    </div>
  </div>
</section>

<!-- D. WHAT WE CARE ABOUT -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-28">
  ${C.sectionHeading({ eyebrow: 'What we care about', title: 'Wellbeing in all its seasons.', intro: 'Bloom is a space for the everyday work of caring for our minds, and for the harder moments too.' })}
  <div class="grid md:grid-cols-2 gap-5">
    ${cares.map(([t, d, spec], i) => `<article class="reveal card p-6 sm:p-8 ${i === cares.length - 1 ? 'md:col-span-2' : ''}">${spec ? '<span class="chip mb-4">Specialist focus</span>' : ''}<h3 class="font-display text-lg sm:text-xl text-forest mb-3">${esc(t)}</h3><p class="text-sm sm:text-base text-ink-soft leading-relaxed">${esc(d)}</p></article>`).join('')}
  </div>
</section>

<!-- E. SPECIALIST FOCUS: GRIEF AND SUICIDE LOSS -->
<section id="specialist-focus" class="scene scene-dark py-16 sm:py-24 md:py-28" aria-labelledby="home-specialist">
  <div class="glow-blob w-64 h-64 sm:w-96 sm:h-96 bg-clay/25 -right-10 top-0" aria-hidden="true"></div>
  <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
    <div class="grid md:grid-cols-5 gap-10 sm:gap-14 items-start">
      <div class="md:col-span-2 reveal">
        <p class="eyebrow-light mb-4">Our specialist focus</p>
        <h2 id="home-specialist" class="font-display text-2xl sm:text-3xl md:text-4xl">Grief and suicide loss, held with particular care.</h2>
      </div>
      <div class="md:col-span-3 reveal space-y-5 text-base sm:text-lg text-sand/90 leading-relaxed">
        <p>Grief can be complex, and when someone has died by suicide it can carry its own weight. People often describe a tangle of feelings: sorrow, guilt, anger, confusion, shame, relief, numbness, or a search for answers that may never come. Some feel they cannot speak openly about how their person died.</p>
        <p>Bloom is committed to creating compassionate spaces for understanding, connection and support. There is no correct way to grieve, and no timeline you are supposed to follow. You will not be diagnosed, hurried or told how to feel here.</p>
        <p class="text-sm sm:text-base text-sand/80">This is one part of what Bloom cares about. If you are here for another reason, you are just as welcome.</p>
        <div class="flex flex-col xs:flex-row flex-wrap gap-3 pt-2">
          <a href="/services" class="btn-light">Support &amp; services</a>
          <a href="/resources" class="btn-ghost-light">Browse resources</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SUPPORT PATHWAYS -->
<section class="bg-sand-deep/60 border-y border-sand-line py-16 sm:py-24 md:py-28">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
    ${C.sectionHeading({ eyebrow: 'Ways in', title: 'Choose the doorway that feels right today.', intro: 'You can use one, all, or none of these, and come back whenever you are ready.' })}
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${pathways.map(([t, d, h, l]) => `<a href="${h}" class="reveal card card-hover p-6 sm:p-7 flex flex-col"><h3 class="font-display text-lg sm:text-xl text-forest mb-3">${esc(t)}</h3><p class="text-sm text-ink-soft leading-relaxed flex-1 mb-5">${esc(d)}</p><span class="text-sm text-forest font-utility inline-flex items-center gap-1.5">${esc(l)} ${C.arrow}</span></a>`).join('')}
    </div>
  </div>
</section>

<!-- FEATURED STORIES -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-28" aria-labelledby="home-stories">
  <div class="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-12">
    <div class="reveal max-w-xl"><p class="eyebrow mb-4">Written stories</p><h2 id="home-stories" class="font-display text-2xl sm:text-3xl md:text-4xl text-forest">In their own words.</h2></div>
    <a href="/stories" class="reveal btn-secondary btn-sm">All written stories</a>
  </div>
  ${stories.length ? `<div class="grid md:grid-cols-3 gap-5 sm:gap-6">${stories.map(C.storyCard).join('')}</div>`
    : emptyState('Stories will be shared here, with consent.', 'People bereaved by suicide can choose to share their experience. Every story is reviewed before it appears, and contributors stay in control of how they are named.', '/stories/share', 'Share your story when you are ready')}
</section>

<!-- FEATURED VIDEO -->
<section class="scene scene-dark py-16 sm:py-24 md:py-28" aria-labelledby="home-videos">
  <div class="glow-blob w-64 h-64 sm:w-96 sm:h-96 bg-clay/25 -left-10 bottom-0" aria-hidden="true"></div>
  <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
    <div class="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-12">
      <div class="reveal max-w-xl"><p class="eyebrow-light mb-4">Video stories</p><h2 id="home-videos" class="font-display text-2xl sm:text-3xl md:text-4xl">Voices, and the people behind them.</h2></div>
      <a href="/stories/videos" class="reveal btn-ghost-light btn-sm">All video stories</a>
    </div>
    ${videos.length ? `<div class="grid sm:grid-cols-2 gap-5 sm:gap-6 text-ink">${videos.map(C.videoCard).join('')}</div>`
      : `<div class="reveal rounded-2xl border border-sand/20 bg-white/5 p-8 sm:p-10 text-center max-w-2xl mx-auto"><h3 class="font-display text-xl mb-2">Video testimonies are not yet available.</h3><p class="text-sm text-sand/80 leading-relaxed mb-5">When contributors choose to share a video, it will appear here with captions where available and a content advisory where needed.</p><a href="/stories/share" class="btn-light btn-sm">Contact us about sharing a video</a></div>`}
  </div>
</section>

<!-- GALLERY PREVIEW -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-28" aria-labelledby="home-gallery">
  <div class="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-12">
    <div class="reveal max-w-xl"><p class="eyebrow mb-4">Gallery</p><h2 id="home-gallery" class="font-display text-2xl sm:text-3xl md:text-4xl text-forest">Remembering, in pictures and art.</h2></div>
    <a href="/gallery" class="reveal btn-secondary btn-sm">Open the gallery</a>
  </div>
  ${gallery.length ? `<ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4" aria-label="Gallery preview">${gallery.map((g) => `<li class="reveal"><a href="/gallery" class="block overflow-hidden rounded-2xl border border-sand-line bg-sand-deep aspect-square"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" data-fallback class="w-full h-full object-cover"></a></li>`).join('')}</ul>`
    : emptyState('The gallery is being prepared.', 'Approved photographs, artwork and remembrance contributions will appear here, always with permission.', '/gallery', 'Learn how images are added')}
  ${gAll.length ? '' : ''}
</section>

<!-- HOW DONATIONS HELP -->
<section class="bg-sand-deep/60 border-y border-sand-line py-16 sm:py-24 md:py-28">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
    ${C.sectionHeading({ eyebrow: 'How donations help', title: 'Gifts keep this space open and carefully held.', intro: content.site().donations.usesStatement })}
    <div class="grid sm:grid-cols-3 gap-px bg-sand-line">
      ${content.site().donations.howGiftsAreUsed.map((x) => `<article class="reveal bg-sand p-7 sm:p-9"><h3 class="font-display text-lg sm:text-xl text-forest mb-3">${esc(x.title)}</h3><p class="text-sm text-ink-soft leading-relaxed">${esc(x.text)}</p></article>`).join('')}
    </div>
  </div>
</section>

<!-- DONATION CTA -->
<section class="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24">
  ${C.donationCta({ title: 'If you are able, help someone else find support.', button: 'Donate' })}
</section>

<!-- F. AN INVITATION TO CONNECT -->
<section class="scene scene-light py-20 sm:py-28 md:py-32">
  <div class="glow-blob w-56 h-56 sm:w-80 sm:h-80 bg-clay/30 left-1/2 -translate-x-1/2 -top-10" aria-hidden="true"></div>
  <div class="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 text-center">
    <p class="reveal eyebrow mb-5 sm:mb-6">An invitation to connect</p>
    <h2 class="reveal signature-line text-2xl sm:text-3xl md:text-4xl text-forest leading-snug">Wherever you are in your journey, there is space for you here.</h2>
    <p class="reveal mt-6 text-sm sm:text-base text-ink-soft max-w-xl mx-auto leading-relaxed">Learn more about Bloom, explore our resources, find out about our work, or simply say hello. You do not have to be okay to reach out. You only have to begin where you are, and your message is met with warmth, not assessment.</p>
    <div class="reveal mt-8 flex flex-col xs:flex-row flex-wrap gap-3 justify-center">
      <a href="/contact" class="btn-primary">Begin a conversation</a>
      <a href="/about" class="btn-secondary">Learn more about Bloom</a>
      <a href="/resources" class="btn-secondary">Explore resources</a>
    </div>
    <p class="reveal mt-8 text-sm text-ink-soft">Need help right now? <a href="/get-help-now" class="text-forest underline underline-offset-4">See urgent support options</a>.</p>
  </div>
</section>`;

  return {
    title: 'Mental health, wellbeing and personal growth',
    description: 'Bloom Psychology is a compassionate space for mental health, wellbeing and personal growth, with a specialist focus on grief, bereavement and suicide loss.',
    path: '/',
    active: 'home',
    body,
  };
};
