alter table public.waitlist
  add column if not exists promo_code text;

alter table public.waitlist
  add constraint waitlist_promo_code_length
  check (promo_code is null or char_length(promo_code) between 1 and 50);
