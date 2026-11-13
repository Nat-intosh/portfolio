import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectAttachedFiles extends Struct.ComponentSchema {
  collectionName: 'components_project_attached_files';
  info: {
    displayName: 'attached_files';
    icon: 'link';
  };
  attributes: {
    attached_media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    attached_name: Schema.Attribute.String;
  };
}

export interface ProjectEmbed extends Struct.ComponentSchema {
  collectionName: 'components_project_embeds';
  info: {
    displayName: 'embed';
    icon: 'code';
  };
  attributes: {
    code: Schema.Attribute.Text;
  };
}

export interface ProjectMultipleMedias extends Struct.ComponentSchema {
  collectionName: 'components_project_multiple_medias';
  info: {
    displayName: 'multiple_medias';
    icon: 'medium';
  };
  attributes: {
    medias: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ProjectSingleMedia extends Struct.ComponentSchema {
  collectionName: 'components_project_single_medias';
  info: {
    displayName: 'single_media';
    icon: 'picture';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ProjectText extends Struct.ComponentSchema {
  collectionName: 'components_project_texts';
  info: {
    displayName: 'text';
    icon: 'bold';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    type: Schema.Attribute.Enumeration<['heading', 'paragraph', 'button']>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'project.attached-files': ProjectAttachedFiles;
      'project.embed': ProjectEmbed;
      'project.multiple-medias': ProjectMultipleMedias;
      'project.single-media': ProjectSingleMedia;
      'project.text': ProjectText;
    }
  }
}
