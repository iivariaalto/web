export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      course_languages: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          language: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          language: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          language?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_languages_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          driving_hours: number
          id: string
          name: string
          price: number
          school_id: string | null
          simulator_hours: number
          total_hours: number
          updated_at: string | null
          vehicle_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          driving_hours: number
          id?: string
          name: string
          price: number
          school_id?: string | null
          simulator_hours: number
          total_hours: number
          updated_at?: string | null
          vehicle_type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          driving_hours?: number
          id?: string
          name?: string
          price?: number
          school_id?: string | null
          simulator_hours?: number
          total_hours?: number
          updated_at?: string | null
          vehicle_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "driving_schools"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_b: {
        Row: {
          ajokortti_tyyppi: string | null
          ajotunnit_autokoulun_autolla: number | null
          autokoulun_auto_ajokokeessa: string | null
          auton_yllapito: string | null
          harjoitusajokoe: string | null
          hinta: number | null
          id: string
          kaupunki: string | null
          koulutuskielet: string | null
          kurssi_nimi: string | null
          opettaja_noutaa_ajotunnille: boolean | null
          osoite: string | null
          sahkoinen_oppimisymparisto_oppikirja: boolean | null
          simulaattori_ajotunnit: number | null
          taloudellinen_ajo: string | null
          teoriakoe_harjoitteluohjelma: boolean | null
          teoriakoe_kaytannon_harjoitus: string | null
          url: string | null
          verkkoteoriatunnit_4_4: boolean | null
          yhteensa_ajo_opetustunteja: number | null
          yksityinen_teoriatunti: boolean | null
          yritys: string | null
        }
        Insert: {
          ajokortti_tyyppi?: string | null
          ajotunnit_autokoulun_autolla?: number | null
          autokoulun_auto_ajokokeessa?: string | null
          auton_yllapito?: string | null
          harjoitusajokoe?: string | null
          hinta?: number | null
          id?: string
          kaupunki?: string | null
          koulutuskielet?: string | null
          kurssi_nimi?: string | null
          opettaja_noutaa_ajotunnille?: boolean | null
          osoite?: string | null
          sahkoinen_oppimisymparisto_oppikirja?: boolean | null
          simulaattori_ajotunnit?: number | null
          taloudellinen_ajo?: string | null
          teoriakoe_harjoitteluohjelma?: boolean | null
          teoriakoe_kaytannon_harjoitus?: string | null
          url?: string | null
          verkkoteoriatunnit_4_4?: boolean | null
          yhteensa_ajo_opetustunteja?: number | null
          yksityinen_teoriatunti?: boolean | null
          yritys?: string | null
        }
        Update: {
          ajokortti_tyyppi?: string | null
          ajotunnit_autokoulun_autolla?: number | null
          autokoulun_auto_ajokokeessa?: string | null
          auton_yllapito?: string | null
          harjoitusajokoe?: string | null
          hinta?: number | null
          id?: string
          kaupunki?: string | null
          koulutuskielet?: string | null
          kurssi_nimi?: string | null
          opettaja_noutaa_ajotunnille?: boolean | null
          osoite?: string | null
          sahkoinen_oppimisymparisto_oppikirja?: boolean | null
          simulaattori_ajotunnit?: number | null
          taloudellinen_ajo?: string | null
          teoriakoe_harjoitteluohjelma?: boolean | null
          teoriakoe_kaytannon_harjoitus?: string | null
          url?: string | null
          verkkoteoriatunnit_4_4?: boolean | null
          yhteensa_ajo_opetustunteja?: number | null
          yksityinen_teoriatunti?: boolean | null
          yritys?: string | null
        }
        Relationships: []
      }
      driving_schools: {
        Row: {
          address: string
          average_rating: number | null
          city: string
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          price_range: string | null
          state: string
          updated_at: string | null
          website: string | null
          zip_code: string
        }
        Insert: {
          address: string
          average_rating?: number | null
          city: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          price_range?: string | null
          state: string
          updated_at?: string | null
          website?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          average_rating?: number | null
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          price_range?: string | null
          state?: string
          updated_at?: string | null
          website?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      school_courses: {
        Row: {
          course_type_id: string | null
          created_at: string | null
          duration: string | null
          id: string
          price: number | null
          school_id: string | null
        }
        Insert: {
          course_type_id?: string | null
          created_at?: string | null
          duration?: string | null
          id?: string
          price?: number | null
          school_id?: string | null
        }
        Update: {
          course_type_id?: string | null
          created_at?: string | null
          duration?: string | null
          id?: string
          price?: number | null
          school_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_courses_course_type_id_fkey"
            columns: ["course_type_id"]
            isOneToOne: false
            referencedRelation: "course_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_courses_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "driving_schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          school_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          school_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          school_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_reviews_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "driving_schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          name: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          name?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          name?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
