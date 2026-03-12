import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_derivatives_owner_kind" AS ENUM('collection', 'global');
  CREATE TYPE "public"."enum_pages_blocks_intro_block_ctas_variant" AS ENUM('filled', 'outlined', 'bare', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_intro_block_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum_pages_blocks_media_banner_items_direction" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pages_blocks_fifty_fifty_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum_pages_blocks_fifty_fifty_image_presets_landscape_state" AS ENUM('unsaved', 'missing', 'ready', 'stale', 'generating', 'failed');
  CREATE TYPE "public"."enum_pages_blocks_fifty_fifty_image_presets_portrait_state" AS ENUM('unsaved', 'missing', 'ready', 'stale', 'generating', 'failed');
  CREATE TYPE "public"."enum_pages_blocks_fifty_fifty_direction" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pages_blocks_list_items_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum_pages_blocks_team_items_direction" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pages_blocks_team_items_background_tint" AS ENUM('primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_row_items_tint_scheme" AS ENUM('secondaryContainer', 'primaryContainer');
  CREATE TYPE "public"."enum_pages_blocks_contacts_form_fields_field_type" AS ENUM('textField', 'select', 'textarea');
  CREATE TYPE "public"."enum_pages_blocks_contacts_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum_pages_blocks_contacts_form_type" AS ENUM('message', 'inscription');
  CREATE TYPE "public"."enum_pages_tint" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_intro_block_ctas_variant" AS ENUM('filled', 'outlined', 'bare', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_intro_block_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum__pages_v_blocks_media_banner_items_direction" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_fifty_fifty_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum__pages_v_blocks_fifty_fifty_image_presets_landscape_state" AS ENUM('unsaved', 'missing', 'ready', 'stale', 'generating', 'failed');
  CREATE TYPE "public"."enum__pages_v_blocks_fifty_fifty_image_presets_portrait_state" AS ENUM('unsaved', 'missing', 'ready', 'stale', 'generating', 'failed');
  CREATE TYPE "public"."enum__pages_v_blocks_fifty_fifty_direction" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_list_items_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum__pages_v_blocks_team_items_direction" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_team_items_background_tint" AS ENUM('primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_row_items_tint_scheme" AS ENUM('secondaryContainer', 'primaryContainer');
  CREATE TYPE "public"."enum__pages_v_blocks_contacts_form_fields_field_type" AS ENUM('textField', 'select', 'textarea');
  CREATE TYPE "public"."enum__pages_v_blocks_contacts_background_tint" AS ENUM('primary', 'primaryContainer', 'secondaryContainer');
  CREATE TYPE "public"."enum__pages_v_blocks_contacts_form_type" AS ENUM('message', 'inscription');
  CREATE TYPE "public"."enum__pages_v_version_tint" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_background_tint" AS ENUM('secondaryContainer', 'primaryContainer');
  CREATE TYPE "public"."enum_service_descriptions_background_tint" AS ENUM('primaryContainer', 'secondaryContainer');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_derivatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_id" integer NOT NULL,
  	"source_collection" varchar,
  	"source_i_d" varchar,
  	"source_version" varchar,
  	"owner_kind" "enum_media_derivatives_owner_kind" NOT NULL,
  	"owner_slug" varchar,
  	"owner_i_d" varchar,
  	"field_path" varchar,
  	"usage_path" varchar,
  	"preset_key" varchar,
  	"preset_aspect_ratio" varchar,
  	"fingerprint" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_intro_block_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"media_id" integer,
  	"variant" "enum_pages_blocks_intro_block_ctas_variant" DEFAULT 'filled'
  );
  
  CREATE TABLE "pages_blocks_intro_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background_tint" "enum_pages_blocks_intro_block_background_tint" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"direction" "enum_pages_blocks_media_banner_items_direction" DEFAULT 'start'
  );
  
  CREATE TABLE "pages_blocks_media_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_fifty_fifty" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background_tint" "enum_pages_blocks_fifty_fifty_background_tint" DEFAULT 'primary',
  	"image_source_id" integer,
  	"image_presets_landscape_crop_x" numeric DEFAULT 50,
  	"image_presets_landscape_crop_y" numeric DEFAULT 50,
  	"image_presets_landscape_crop_zoom" numeric DEFAULT 1,
  	"image_presets_landscape_derivative_id" integer,
  	"image_presets_landscape_state" "enum_pages_blocks_fifty_fifty_image_presets_landscape_state",
  	"image_presets_landscape_fingerprint" varchar,
  	"image_presets_landscape_source_version" varchar,
  	"image_presets_landscape_last_generated_at" timestamp(3) with time zone,
  	"image_presets_landscape_last_error" varchar,
  	"image_presets_portrait_crop_x" numeric DEFAULT 50,
  	"image_presets_portrait_crop_y" numeric DEFAULT 50,
  	"image_presets_portrait_crop_zoom" numeric DEFAULT 1,
  	"image_presets_portrait_derivative_id" integer,
  	"image_presets_portrait_state" "enum_pages_blocks_fifty_fifty_image_presets_portrait_state",
  	"image_presets_portrait_fingerprint" varchar,
  	"image_presets_portrait_source_version" varchar,
  	"image_presets_portrait_last_generated_at" timestamp(3) with time zone,
  	"image_presets_portrait_last_error" varchar,
  	"direction" "enum_pages_blocks_fifty_fifty_direction" DEFAULT 'start',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"background_tint" "enum_pages_blocks_list_items_background_tint" DEFAULT 'secondaryContainer',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"person_id" integer,
  	"direction" "enum_pages_blocks_team_items_direction" DEFAULT 'start',
  	"background_tint" "enum_pages_blocks_team_items_background_tint" DEFAULT 'primaryContainer'
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"tint_scheme" "enum_pages_blocks_testimonials_row_items_tint_scheme" DEFAULT 'secondaryContainer'
  );
  
  CREATE TABLE "pages_blocks_testimonials_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contacts_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_type" "enum_pages_blocks_contacts_form_fields_field_type" DEFAULT 'textField',
  	"field_name" varchar,
  	"field_label" varchar,
  	"required" boolean,
  	"options_source_id" integer
  );
  
  CREATE TABLE "pages_blocks_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_tint" "enum_pages_blocks_contacts_background_tint" DEFAULT 'primary',
  	"information" jsonb,
  	"form_type" "enum_pages_blocks_contacts_form_type" DEFAULT 'message',
  	"show_map" boolean DEFAULT true,
  	"location" geometry(Point),
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"slug_manual_override" boolean DEFAULT false,
  	"navigation_label" varchar,
  	"tint" "enum_pages_tint" DEFAULT 'primary',
  	"is_homepage" boolean,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"service_descriptions_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_intro_block_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"media_id" integer,
  	"variant" "enum__pages_v_blocks_intro_block_ctas_variant" DEFAULT 'filled',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_intro_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background_tint" "enum__pages_v_blocks_intro_block_background_tint" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"direction" "enum__pages_v_blocks_media_banner_items_direction" DEFAULT 'start',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_fifty_fifty" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background_tint" "enum__pages_v_blocks_fifty_fifty_background_tint" DEFAULT 'primary',
  	"image_source_id" integer,
  	"image_presets_landscape_crop_x" numeric DEFAULT 50,
  	"image_presets_landscape_crop_y" numeric DEFAULT 50,
  	"image_presets_landscape_crop_zoom" numeric DEFAULT 1,
  	"image_presets_landscape_derivative_id" integer,
  	"image_presets_landscape_state" "enum__pages_v_blocks_fifty_fifty_image_presets_landscape_state",
  	"image_presets_landscape_fingerprint" varchar,
  	"image_presets_landscape_source_version" varchar,
  	"image_presets_landscape_last_generated_at" timestamp(3) with time zone,
  	"image_presets_landscape_last_error" varchar,
  	"image_presets_portrait_crop_x" numeric DEFAULT 50,
  	"image_presets_portrait_crop_y" numeric DEFAULT 50,
  	"image_presets_portrait_crop_zoom" numeric DEFAULT 1,
  	"image_presets_portrait_derivative_id" integer,
  	"image_presets_portrait_state" "enum__pages_v_blocks_fifty_fifty_image_presets_portrait_state",
  	"image_presets_portrait_fingerprint" varchar,
  	"image_presets_portrait_source_version" varchar,
  	"image_presets_portrait_last_generated_at" timestamp(3) with time zone,
  	"image_presets_portrait_last_error" varchar,
  	"direction" "enum__pages_v_blocks_fifty_fifty_direction" DEFAULT 'start',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"background_tint" "enum__pages_v_blocks_list_items_background_tint" DEFAULT 'secondaryContainer',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"person_id" integer,
  	"direction" "enum__pages_v_blocks_team_items_direction" DEFAULT 'start',
  	"background_tint" "enum__pages_v_blocks_team_items_background_tint" DEFAULT 'primaryContainer',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"tint_scheme" "enum__pages_v_blocks_testimonials_row_items_tint_scheme" DEFAULT 'secondaryContainer',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contacts_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"field_type" "enum__pages_v_blocks_contacts_form_fields_field_type" DEFAULT 'textField',
  	"field_name" varchar,
  	"field_label" varchar,
  	"required" boolean,
  	"options_source_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_in_sub_navigation" boolean DEFAULT true,
  	"sub_navigation_label" varchar,
  	"anchor_slug" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_tint" "enum__pages_v_blocks_contacts_background_tint" DEFAULT 'primary',
  	"information" jsonb,
  	"form_type" "enum__pages_v_blocks_contacts_form_type" DEFAULT 'message',
  	"show_map" boolean DEFAULT true,
  	"location" geometry(Point),
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_manual_override" boolean DEFAULT false,
  	"version_navigation_label" varchar,
  	"version_tint" "enum__pages_v_version_tint" DEFAULT 'primary',
  	"version_is_homepage" boolean,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"service_descriptions_id" integer
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"background_tint" "enum_services_background_tint" DEFAULT 'secondaryContainer',
  	"picture_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_descriptions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"background_tint" "enum_service_descriptions_background_tint" DEFAULT 'primaryContainer',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"given_name" varchar NOT NULL,
  	"surname" varchar NOT NULL,
  	"job_title" varchar,
  	"summary" jsonb,
  	"picture_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"given_name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_sessions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "course_sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"media_derivatives_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"service_descriptions_id" integer,
  	"people_id" integer,
  	"testimonials_id" integer,
  	"course_sessions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "main_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page_id" integer NOT NULL,
  	"label_override" varchar
  );
  
  CREATE TABLE "main_navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_derivatives" ADD CONSTRAINT "media_derivatives_source_id_media_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_block_ctas" ADD CONSTRAINT "pages_blocks_intro_block_ctas_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_block_ctas" ADD CONSTRAINT "pages_blocks_intro_block_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_intro_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_block" ADD CONSTRAINT "pages_blocks_intro_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_banner_items" ADD CONSTRAINT "pages_blocks_media_banner_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_banner_items" ADD CONSTRAINT "pages_blocks_media_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_banner" ADD CONSTRAINT "pages_blocks_media_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fifty_fifty" ADD CONSTRAINT "pages_blocks_fifty_fifty_image_source_id_media_id_fk" FOREIGN KEY ("image_source_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_fifty_fifty" ADD CONSTRAINT "pages_blocks_fifty_fifty_image_presets_landscape_derivative_id_media_derivatives_id_fk" FOREIGN KEY ("image_presets_landscape_derivative_id") REFERENCES "public"."media_derivatives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_fifty_fifty" ADD CONSTRAINT "pages_blocks_fifty_fifty_image_presets_portrait_derivative_id_media_derivatives_id_fk" FOREIGN KEY ("image_presets_portrait_derivative_id") REFERENCES "public"."media_derivatives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_fifty_fifty" ADD CONSTRAINT "pages_blocks_fifty_fifty_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_items_items" ADD CONSTRAINT "pages_blocks_list_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_items" ADD CONSTRAINT "pages_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_items" ADD CONSTRAINT "pages_blocks_team_items_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_items" ADD CONSTRAINT "pages_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_row_items" ADD CONSTRAINT "pages_blocks_testimonials_row_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_row_items" ADD CONSTRAINT "pages_blocks_testimonials_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_row" ADD CONSTRAINT "pages_blocks_testimonials_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contacts_form_fields" ADD CONSTRAINT "pages_blocks_contacts_form_fields_options_source_id_course_sessions_id_fk" FOREIGN KEY ("options_source_id") REFERENCES "public"."course_sessions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contacts_form_fields" ADD CONSTRAINT "pages_blocks_contacts_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contacts" ADD CONSTRAINT "pages_blocks_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_meta_image_id_media_id_fk" FOREIGN KEY ("seo_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_service_descriptions_fk" FOREIGN KEY ("service_descriptions_id") REFERENCES "public"."service_descriptions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_block_ctas" ADD CONSTRAINT "_pages_v_blocks_intro_block_ctas_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_block_ctas" ADD CONSTRAINT "_pages_v_blocks_intro_block_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_intro_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_block" ADD CONSTRAINT "_pages_v_blocks_intro_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_banner_items" ADD CONSTRAINT "_pages_v_blocks_media_banner_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_banner_items" ADD CONSTRAINT "_pages_v_blocks_media_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_banner" ADD CONSTRAINT "_pages_v_blocks_media_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fifty_fifty" ADD CONSTRAINT "_pages_v_blocks_fifty_fifty_image_source_id_media_id_fk" FOREIGN KEY ("image_source_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fifty_fifty" ADD CONSTRAINT "_pages_v_blocks_fifty_fifty_image_presets_landscape_derivative_id_media_derivatives_id_fk" FOREIGN KEY ("image_presets_landscape_derivative_id") REFERENCES "public"."media_derivatives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fifty_fifty" ADD CONSTRAINT "_pages_v_blocks_fifty_fifty_image_presets_portrait_derivative_id_media_derivatives_id_fk" FOREIGN KEY ("image_presets_portrait_derivative_id") REFERENCES "public"."media_derivatives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fifty_fifty" ADD CONSTRAINT "_pages_v_blocks_fifty_fifty_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_items_items" ADD CONSTRAINT "_pages_v_blocks_list_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_items" ADD CONSTRAINT "_pages_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_items" ADD CONSTRAINT "_pages_v_blocks_team_items_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_items" ADD CONSTRAINT "_pages_v_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_row_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_row_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_row_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_row" ADD CONSTRAINT "_pages_v_blocks_testimonials_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contacts_form_fields" ADD CONSTRAINT "_pages_v_blocks_contacts_form_fields_options_source_id_course_sessions_id_fk" FOREIGN KEY ("options_source_id") REFERENCES "public"."course_sessions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contacts_form_fields" ADD CONSTRAINT "_pages_v_blocks_contacts_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contacts" ADD CONSTRAINT "_pages_v_blocks_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_meta_image_id_media_id_fk" FOREIGN KEY ("version_seo_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_service_descriptions_fk" FOREIGN KEY ("service_descriptions_id") REFERENCES "public"."service_descriptions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_sessions_items" ADD CONSTRAINT "course_sessions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_derivatives_fk" FOREIGN KEY ("media_derivatives_id") REFERENCES "public"."media_derivatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_descriptions_fk" FOREIGN KEY ("service_descriptions_id") REFERENCES "public"."service_descriptions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_course_sessions_fk" FOREIGN KEY ("course_sessions_id") REFERENCES "public"."course_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_navigation_items" ADD CONSTRAINT "main_navigation_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_navigation_items" ADD CONSTRAINT "main_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_derivatives_source_idx" ON "media_derivatives" USING btree ("source_id");
  CREATE INDEX "media_derivatives_updated_at_idx" ON "media_derivatives" USING btree ("updated_at");
  CREATE INDEX "media_derivatives_created_at_idx" ON "media_derivatives" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_derivatives_filename_idx" ON "media_derivatives" USING btree ("filename");
  CREATE INDEX "pages_blocks_intro_block_ctas_order_idx" ON "pages_blocks_intro_block_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_block_ctas_parent_id_idx" ON "pages_blocks_intro_block_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_block_ctas_media_idx" ON "pages_blocks_intro_block_ctas" USING btree ("media_id");
  CREATE INDEX "pages_blocks_intro_block_order_idx" ON "pages_blocks_intro_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_block_parent_id_idx" ON "pages_blocks_intro_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_block_path_idx" ON "pages_blocks_intro_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_banner_items_order_idx" ON "pages_blocks_media_banner_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_banner_items_parent_id_idx" ON "pages_blocks_media_banner_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_banner_items_image_idx" ON "pages_blocks_media_banner_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_media_banner_order_idx" ON "pages_blocks_media_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_banner_parent_id_idx" ON "pages_blocks_media_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_banner_path_idx" ON "pages_blocks_media_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_fifty_fifty_order_idx" ON "pages_blocks_fifty_fifty" USING btree ("_order");
  CREATE INDEX "pages_blocks_fifty_fifty_parent_id_idx" ON "pages_blocks_fifty_fifty" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fifty_fifty_path_idx" ON "pages_blocks_fifty_fifty" USING btree ("_path");
  CREATE INDEX "pages_blocks_fifty_fifty_image_image_source_idx" ON "pages_blocks_fifty_fifty" USING btree ("image_source_id");
  CREATE INDEX "pages_blocks_fifty_fifty_image_presets_landscape_image_p_idx" ON "pages_blocks_fifty_fifty" USING btree ("image_presets_landscape_derivative_id");
  CREATE INDEX "pages_blocks_fifty_fifty_image_presets_portrait_image_pr_idx" ON "pages_blocks_fifty_fifty" USING btree ("image_presets_portrait_derivative_id");
  CREATE INDEX "pages_blocks_list_items_items_order_idx" ON "pages_blocks_list_items_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_items_items_parent_id_idx" ON "pages_blocks_list_items_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_items_order_idx" ON "pages_blocks_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_items_parent_id_idx" ON "pages_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_items_path_idx" ON "pages_blocks_list_items" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_items_order_idx" ON "pages_blocks_services_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_items_parent_id_idx" ON "pages_blocks_services_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_items_order_idx" ON "pages_blocks_team_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_items_parent_id_idx" ON "pages_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_items_person_idx" ON "pages_blocks_team_items" USING btree ("person_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_row_items_order_idx" ON "pages_blocks_testimonials_row_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_row_items_parent_id_idx" ON "pages_blocks_testimonials_row_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_row_items_testimonial_idx" ON "pages_blocks_testimonials_row_items" USING btree ("testimonial_id");
  CREATE INDEX "pages_blocks_testimonials_row_order_idx" ON "pages_blocks_testimonials_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_row_parent_id_idx" ON "pages_blocks_testimonials_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_row_path_idx" ON "pages_blocks_testimonials_row" USING btree ("_path");
  CREATE INDEX "pages_blocks_contacts_form_fields_order_idx" ON "pages_blocks_contacts_form_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contacts_form_fields_parent_id_idx" ON "pages_blocks_contacts_form_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contacts_form_fields_options_source_idx" ON "pages_blocks_contacts_form_fields" USING btree ("options_source_id");
  CREATE INDEX "pages_blocks_contacts_order_idx" ON "pages_blocks_contacts" USING btree ("_order");
  CREATE INDEX "pages_blocks_contacts_parent_id_idx" ON "pages_blocks_contacts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contacts_path_idx" ON "pages_blocks_contacts" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_meta_image_idx" ON "pages" USING btree ("seo_meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_service_descriptions_id_idx" ON "pages_rels" USING btree ("service_descriptions_id");
  CREATE INDEX "_pages_v_blocks_intro_block_ctas_order_idx" ON "_pages_v_blocks_intro_block_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_block_ctas_parent_id_idx" ON "_pages_v_blocks_intro_block_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_block_ctas_media_idx" ON "_pages_v_blocks_intro_block_ctas" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_intro_block_order_idx" ON "_pages_v_blocks_intro_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_block_parent_id_idx" ON "_pages_v_blocks_intro_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_block_path_idx" ON "_pages_v_blocks_intro_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_banner_items_order_idx" ON "_pages_v_blocks_media_banner_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_banner_items_parent_id_idx" ON "_pages_v_blocks_media_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_banner_items_image_idx" ON "_pages_v_blocks_media_banner_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_media_banner_order_idx" ON "_pages_v_blocks_media_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_banner_parent_id_idx" ON "_pages_v_blocks_media_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_banner_path_idx" ON "_pages_v_blocks_media_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_fifty_fifty_order_idx" ON "_pages_v_blocks_fifty_fifty" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_fifty_fifty_parent_id_idx" ON "_pages_v_blocks_fifty_fifty" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_fifty_fifty_path_idx" ON "_pages_v_blocks_fifty_fifty" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_fifty_fifty_image_image_source_idx" ON "_pages_v_blocks_fifty_fifty" USING btree ("image_source_id");
  CREATE INDEX "_pages_v_blocks_fifty_fifty_image_presets_landscape_imag_idx" ON "_pages_v_blocks_fifty_fifty" USING btree ("image_presets_landscape_derivative_id");
  CREATE INDEX "_pages_v_blocks_fifty_fifty_image_presets_portrait_image_idx" ON "_pages_v_blocks_fifty_fifty" USING btree ("image_presets_portrait_derivative_id");
  CREATE INDEX "_pages_v_blocks_list_items_items_order_idx" ON "_pages_v_blocks_list_items_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_items_items_parent_id_idx" ON "_pages_v_blocks_list_items_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_items_order_idx" ON "_pages_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_items_parent_id_idx" ON "_pages_v_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_items_path_idx" ON "_pages_v_blocks_list_items" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_items_order_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_items_parent_id_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_items_order_idx" ON "_pages_v_blocks_team_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_items_parent_id_idx" ON "_pages_v_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_items_person_idx" ON "_pages_v_blocks_team_items" USING btree ("person_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_row_items_order_idx" ON "_pages_v_blocks_testimonials_row_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_row_items_parent_id_idx" ON "_pages_v_blocks_testimonials_row_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_row_items_testimonial_idx" ON "_pages_v_blocks_testimonials_row_items" USING btree ("testimonial_id");
  CREATE INDEX "_pages_v_blocks_testimonials_row_order_idx" ON "_pages_v_blocks_testimonials_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_row_parent_id_idx" ON "_pages_v_blocks_testimonials_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_row_path_idx" ON "_pages_v_blocks_testimonials_row" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contacts_form_fields_order_idx" ON "_pages_v_blocks_contacts_form_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contacts_form_fields_parent_id_idx" ON "_pages_v_blocks_contacts_form_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contacts_form_fields_options_source_idx" ON "_pages_v_blocks_contacts_form_fields" USING btree ("options_source_id");
  CREATE INDEX "_pages_v_blocks_contacts_order_idx" ON "_pages_v_blocks_contacts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contacts_parent_id_idx" ON "_pages_v_blocks_contacts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contacts_path_idx" ON "_pages_v_blocks_contacts" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_meta_image_idx" ON "_pages_v" USING btree ("version_seo_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_service_descriptions_id_idx" ON "_pages_v_rels" USING btree ("service_descriptions_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_picture_idx" ON "services" USING btree ("picture_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "service_descriptions_slug_idx" ON "service_descriptions" USING btree ("slug");
  CREATE INDEX "service_descriptions_updated_at_idx" ON "service_descriptions" USING btree ("updated_at");
  CREATE INDEX "service_descriptions_created_at_idx" ON "service_descriptions" USING btree ("created_at");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_picture_idx" ON "people" USING btree ("picture_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_slug_idx" ON "testimonials" USING btree ("slug");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "course_sessions_items_order_idx" ON "course_sessions_items" USING btree ("_order");
  CREATE INDEX "course_sessions_items_parent_id_idx" ON "course_sessions_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "course_sessions_slug_idx" ON "course_sessions" USING btree ("slug");
  CREATE INDEX "course_sessions_updated_at_idx" ON "course_sessions" USING btree ("updated_at");
  CREATE INDEX "course_sessions_created_at_idx" ON "course_sessions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_media_derivatives_id_idx" ON "payload_locked_documents_rels" USING btree ("media_derivatives_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_service_descriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("service_descriptions_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_course_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("course_sessions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "main_navigation_items_order_idx" ON "main_navigation_items" USING btree ("_order");
  CREATE INDEX "main_navigation_items_parent_id_idx" ON "main_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "main_navigation_items_page_idx" ON "main_navigation_items" USING btree ("page_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_derivatives" CASCADE;
  DROP TABLE "pages_blocks_intro_block_ctas" CASCADE;
  DROP TABLE "pages_blocks_intro_block" CASCADE;
  DROP TABLE "pages_blocks_media_banner_items" CASCADE;
  DROP TABLE "pages_blocks_media_banner" CASCADE;
  DROP TABLE "pages_blocks_fifty_fifty" CASCADE;
  DROP TABLE "pages_blocks_list_items_items" CASCADE;
  DROP TABLE "pages_blocks_list_items" CASCADE;
  DROP TABLE "pages_blocks_services_grid_items" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_team_items" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_testimonials_row_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials_row" CASCADE;
  DROP TABLE "pages_blocks_contacts_form_fields" CASCADE;
  DROP TABLE "pages_blocks_contacts" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_block_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_block" CASCADE;
  DROP TABLE "_pages_v_blocks_media_banner_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_fifty_fifty" CASCADE;
  DROP TABLE "_pages_v_blocks_list_items_items" CASCADE;
  DROP TABLE "_pages_v_blocks_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_team_items" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_row_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_row" CASCADE;
  DROP TABLE "_pages_v_blocks_contacts_form_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contacts" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "service_descriptions" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "course_sessions_items" CASCADE;
  DROP TABLE "course_sessions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "main_navigation_items" CASCADE;
  DROP TABLE "main_navigation" CASCADE;
  DROP TYPE "public"."enum_media_derivatives_owner_kind";
  DROP TYPE "public"."enum_pages_blocks_intro_block_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_intro_block_background_tint";
  DROP TYPE "public"."enum_pages_blocks_media_banner_items_direction";
  DROP TYPE "public"."enum_pages_blocks_fifty_fifty_background_tint";
  DROP TYPE "public"."enum_pages_blocks_fifty_fifty_image_presets_landscape_state";
  DROP TYPE "public"."enum_pages_blocks_fifty_fifty_image_presets_portrait_state";
  DROP TYPE "public"."enum_pages_blocks_fifty_fifty_direction";
  DROP TYPE "public"."enum_pages_blocks_list_items_background_tint";
  DROP TYPE "public"."enum_pages_blocks_team_items_direction";
  DROP TYPE "public"."enum_pages_blocks_team_items_background_tint";
  DROP TYPE "public"."enum_pages_blocks_testimonials_row_items_tint_scheme";
  DROP TYPE "public"."enum_pages_blocks_contacts_form_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_contacts_background_tint";
  DROP TYPE "public"."enum_pages_blocks_contacts_form_type";
  DROP TYPE "public"."enum_pages_tint";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_intro_block_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_intro_block_background_tint";
  DROP TYPE "public"."enum__pages_v_blocks_media_banner_items_direction";
  DROP TYPE "public"."enum__pages_v_blocks_fifty_fifty_background_tint";
  DROP TYPE "public"."enum__pages_v_blocks_fifty_fifty_image_presets_landscape_state";
  DROP TYPE "public"."enum__pages_v_blocks_fifty_fifty_image_presets_portrait_state";
  DROP TYPE "public"."enum__pages_v_blocks_fifty_fifty_direction";
  DROP TYPE "public"."enum__pages_v_blocks_list_items_background_tint";
  DROP TYPE "public"."enum__pages_v_blocks_team_items_direction";
  DROP TYPE "public"."enum__pages_v_blocks_team_items_background_tint";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_row_items_tint_scheme";
  DROP TYPE "public"."enum__pages_v_blocks_contacts_form_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_contacts_background_tint";
  DROP TYPE "public"."enum__pages_v_blocks_contacts_form_type";
  DROP TYPE "public"."enum__pages_v_version_tint";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_services_background_tint";
  DROP TYPE "public"."enum_service_descriptions_background_tint";`)
}
