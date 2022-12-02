
DROP TABLE IF EXISTS public.template CASCADE;
DROP TABLE IF EXISTS public.deployed;
DROP TABLE IF EXISTS public.user;
DROP SEQUENCE IF EXISTS public.serial;

CREATE TABLE public.template (
   id   INTEGER PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   "formConfig" VARCHAR(10000) NOT NULL,
   "templateFormat" INTEGER NOT NULL,
   url VARCHAR(10000) NOT NULL
);

CREATE TABLE public.deployed (
    id  INTEGER PRIMARY KEY,
    template_id INTEGER NOT NULL,
    name VARCHAR(10000) NOT NULL,
    stack_id    VARCHAR(10000) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT now(),
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY(template_id) REFERENCES template(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE public.user (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(10000) NOT NULL
);

CREATE SEQUENCE public.serial START 101;

INSERT INTO public.template 
(id, name, url, "templateFormat", "formConfig")
VALUES
(1, 
'Website in S3 bucket', 
'https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml',
1,
'[{"page_label":"Website in S3 bucket","fields":[]}]'
);

INSERT INTO public.template 
(id, name, url, "templateFormat", "formConfig")
VALUES
(2, 
'Wordpress site', 
'https://raw.githubusercontent.com/sasuolander/templatesAWS/master/WordPress_Single_InstanceOwn.yaml',
1,
'[{"page_label":"Wordpress site","fields":[{"field_id":"DBName","field_label":"DB Name","field_mandatory":"yes","field_placeholder":"Enter DB name","field_type":"text","field_value":"","field_error":"","field_regex":"[a-zA-Z][a-zA-Z0-9]*","field_max":"64","field_min":"1"},{"field_id":"DBPassword","field_label":"DB Password","field_mandatory":"yes","field_placeholder":"Enter DB password","field_type":"text","field_value":"","field_error":"","field_regex":"[a-zA-Z0-9]+","field_max":"41","field_min":"8"},{"field_id":"DBRootPassword","field_label":"DB Root Password","field_mandatory":"yes","field_placeholder":"Enter DB Root password","field_type":"text","field_value":"","field_error":"","field_regex":"[a-zA-Z0-9]+","field_max":"41","field_min":"8"},{"field_id":"DBUser","field_label":"DB User","field_mandatory":"yes","field_placeholder":"Enter User name","field_type":"text","field_value":"","field_error":"","field_regex":"[a-zA-Z][a-zA-Z0-9]*","field_max":"16","field_min":"1"},{"field_id":"InstanceType","field_label":"Instance Type","field_value":"t2.nano","field_error":"","field_mandatory":"yes","field_options":[{"option_label":"t2.nano"},{"option_label":"t2.micro"}],"field_type":"select"},{"field_id":"SSHLocation","field_label":"SSH Location","field_mandatory":"yes","field_placeholder":"Enter User name","field_type":"text","field_value":"","field_error":"","field_regex":"(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})","field_max":"18","field_min":"9"}]}]'
);

INSERT INTO public.user
(id, name, password)
VALUES
(1, 'Dummy', 'dummy');
